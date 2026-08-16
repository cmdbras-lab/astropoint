/* AstroPointer v0.2.1: independent compass-heading calibration. */
(() => {
  const $ = id => document.getElementById(id);
  const KEY = 'astropointer.compassOffsetDeg.v1';
  const norm360 = d => ((d % 360) + 360) % 360;
  const signed = d => { d = norm360(d); return d > 180 ? d - 360 : d; };

  let compassOffset = Number.parseFloat(localStorage.getItem(KEY));
  if (!Number.isFinite(compassOffset)) compassOffset = 0;
  let lastRawAz = null;
  let lastCorrectedAz = null;
  let samples = [];
  let eightTimer = null;

  function circularMean(values) {
    if (!values.length) return NaN;
    let sx = 0, sy = 0;
    for (const v of values) {
      const r = v * Math.PI / 180;
      sx += Math.cos(r); sy += Math.sin(r);
    }
    return norm360(Math.atan2(sy, sx) * 180 / Math.PI);
  }

  function recentMean() {
    const now = performance.now();
    const vals = samples.filter(s => now - s.t <= 900).map(s => s.az);
    return circularMean(vals.length ? vals : samples.slice(-12).map(s => s.az));
  }

  function ui() {
    const raw = $('v021RawAz'), corr = $('v021CorrectedAz'), off = $('v021Offset'), err = $('v021Residual');
    if (raw) raw.textContent = Number.isFinite(lastRawAz) ? `${lastRawAz.toFixed(1)}°` : '—';
    if (corr) corr.textContent = Number.isFinite(lastCorrectedAz) ? `${lastCorrectedAz.toFixed(1)}°` : '—';
    if (off) off.textContent = `${compassOffset >= 0 ? '+' : ''}${compassOffset.toFixed(1)}°`;
    if (err) {
      if (typeof target !== 'undefined' && target && Number.isFinite(lastCorrectedAz)) {
        const e = signed(target.az - lastCorrectedAz);
        err.textContent = `${e >= 0 ? '+' : ''}${e.toFixed(1)}°`;
      } else err.textContent = '—';
    }
  }

  const oldOrientation = window.onNativeOrientation;
  window.onNativeOrientation = d => {
    const raw = +d.azimuthTrue;
    if (Number.isFinite(raw)) {
      lastRawAz = norm360(raw);
      samples.push({az:lastRawAz,t:performance.now()});
      if (samples.length > 120) samples.splice(0, samples.length - 120);
      lastCorrectedAz = norm360(lastRawAz + compassOffset);
      d = Object.assign({}, d, { azimuthTrue: lastCorrectedAz });
    }
    if (typeof oldOrientation === 'function') oldOrientation(d);
    ui();
  };

  function saveOffset(v, reason) {
    compassOffset = signed(v);
    localStorage.setItem(KEY, String(compassOffset));
    if (Number.isFinite(lastRawAz)) lastCorrectedAz = norm360(lastRawAz + compassOffset);
    const st = $('v021CompassStatus');
    if (st) st.textContent = `${reason} Correção gravada: ${compassOffset >= 0 ? '+' : ''}${compassOffset.toFixed(1)}°. Esta correção é independente da calibração do eixo óptico.`;
    ui();
  }

  function calibrateToBearing(bearing, label) {
    const mean = recentMean();
    if (!Number.isFinite(mean)) {
      const st = $('v021CompassStatus'); if (st) st.textContent = 'Ainda não existem leituras suficientes da bússola.';
      return;
    }
    saveOffset(signed(bearing - mean), `${label}.`);
  }

  function calibrateToTarget() {
    if (typeof target === 'undefined' || !target || !Number.isFinite(target.az)) {
      const st = $('v021CompassStatus'); if (st) st.textContent = 'Selecione primeiro um alvo com posição calculada na Mira.';
      return;
    }
    calibrateToBearing(target.az, `Calibração pelo alvo atual (AZ verdadeiro ${target.az.toFixed(1)}°)`);
  }

  function clearCompass() {
    compassOffset = 0;
    localStorage.removeItem(KEY);
    if (Number.isFinite(lastRawAz)) lastCorrectedAz = lastRawAz;
    const st = $('v021CompassStatus');
    if (st) st.textContent = 'Correção de rumo removida. A app voltou a usar apenas o rumo Android + declinação magnética automática.';
    ui();
  }

  function startEightGuide() {
    if (eightTimer) clearInterval(eightTimer);
    let n = 12;
    const st = $('v021CompassStatus');
    if (st) st.textContent = 'Afaste o telemóvel de metal, ímanes, colunas e motores. Faça movimentos amplos em forma de 8 durante 12 s…';
    const b = $('v021Eight'); if (b) b.disabled = true;
    eightTimer = setInterval(() => {
      n--;
      if (st) st.textContent = n > 0 ? `Continue o movimento em 8… ${n} s` : `Terminado. Precisão reportada pelo Android: ${state.sensorAccuracy || '—'}. Agora aponte a aresta superior para um alvo conhecido e faça a calibração de rumo.`;
      if (n <= 0) { clearInterval(eightTimer); eightTimer = null; if (b) b.disabled = false; }
    }, 1000);
  }

  const view = $('view-aim');
  if (view) {
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `
      <h2>Calibração da bússola</h2>
      <div class="aim-values">
        <div class="aim-value"><span>Rumo bruto</span><b id="v021RawAz">—</b></div>
        <div class="aim-value"><span>Correção aplicada</span><b id="v021Offset">${compassOffset >= 0 ? '+' : ''}${compassOffset.toFixed(1)}°</b></div>
        <div class="aim-value"><span>Rumo corrigido</span><b id="v021CorrectedAz">—</b></div>
        <div class="aim-value"><span>Erro para alvo atual</span><b id="v021Residual">—</b></div>
      </div>
      <p class="small">1) Faça primeiro a calibração física do magnetómetro em “8”. 2) Selecione um astro facilmente identificável (Lua é ideal), aponte a <b>aresta superior física</b> do telefone exatamente para ele e mantenha imóvel. 3) Carregue em “Calibrar com alvo atual”.</p>
      <div class="row"><button id="v021Eight">① Calibrar sensor em “8”</button><button id="v021CalTarget" class="primary">② Calibrar com alvo atual</button></div>
      <div class="row" style="margin-top:8px"><button id="v021CalNorth">Calibrar apontando para Norte verdadeiro</button><button id="v021Clear">Limpar correção</button></div>
      <div id="v021CompassStatus" class="status" style="margin-top:8px">A correção é persistente e não altera a calibração mecânica do eixo óptico.</div>
      <p class="small">Se uma calibração feita num azimute ficar correta mas houver erro grande noutro azimute, isso indica distorção magnética dependente da direção; nesse caso passaremos para uma calibração multiponto do magnetómetro.</p>`;
    const firstPanel = view.querySelector('.panel');
    if (firstPanel) firstPanel.after(panel); else view.prepend(panel);
    $('v021Eight').onclick = startEightGuide;
    $('v021CalTarget').onclick = calibrateToTarget;
    $('v021CalNorth').onclick = () => calibrateToBearing(0, 'Calibração para Norte verdadeiro');
    $('v021Clear').onclick = clearCompass;
  }

  // Keep the residual indicator live when the target changes.
  const oldSetTarget = setTarget;
  setTarget = function(h) { oldSetTarget(h); setTimeout(ui, 0); };
  ui();
})();
