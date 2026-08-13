/* AstroPointer v0.2.0 extension: 2027 eclipse, observing events, Sun path, landscape/table use. */
(() => {
  const $ = id => document.getElementById(id);
  const cutoff = new Date('2027-08-03T00:00:00Z');
  const METEORS = [
    ['κ-Cygnids','2026-08-17T00:00:00Z',288,55,'~3','máximo amplo'],
    ['September ε-Perseids','2026-09-09T18:00:00Z',48,40,'~8','máximo IMO'],
    ['Orionids','2026-10-21T00:00:00Z',95,16,'20+','máximo amplo'],
    ['Leonids','2026-11-17T23:45:00Z',152,22,'~15','máximo nodal IMO'],
    ['Geminids','2026-12-14T14:00:00Z',112,33,'~150','chuva forte'],
    ['Ursids','2026-12-22T22:00:00Z',217,76,'~10','máximo IMO'],
    ['Quadrantids','2027-01-04T03:25:00Z',230,49,'~80','condições lunares favoráveis'],
    ['Lyrids','2027-04-23T01:40:00Z',271,34,'~18','máximo previsto'],
    ['η-Aquariids','2027-05-06T09:00:00Z',338,-1,'~50','melhor antes do amanhecer'],
    ['July γ-Draconids','2027-07-28T21:00:00Z',280,51,'variável','possível máximo estreito'],
    ['Southern δ-Aquariids','2027-07-31T00:00:00Z',340,-16,'~25','máximo amplo']
  ];
  const bodyNames = {Sun:'Sol',Moon:'Lua',Mercury:'Mercúrio',Venus:'Vénus',Mars:'Marte',Jupiter:'Júpiter',Saturn:'Saturno'};
  let customAim = null;

  function ready(){ return typeof Astronomy !== 'undefined' && Astronomy.Observer; }
  function activeLat(){ return Number.isFinite(state.calcLat) ? state.calcLat : state.gpsLat; }
  function activeLon(){ return Number.isFinite(state.calcLon) ? state.calcLon : state.gpsLon; }
  function obs(){ return new Astronomy.Observer(activeLat(), activeLon(), 0); }
  function fmt(d){ return new Intl.DateTimeFormat('pt-PT',{dateStyle:'medium',timeStyle:'short'}).format(d); }
  function hBody(body, when=new Date()){
    if(!ready() || !Number.isFinite(activeLat())) return null;
    const eq=Astronomy.Equator(Astronomy.Body[body],when,obs(),true,true);
    const h=Astronomy.Horizon(when,obs(),eq.ra,eq.dec,'normal');
    return {az:h.azimuth,alt:h.altitude};
  }
  function hRaDec(raDeg,dec,when){
    if(!ready() || !Number.isFinite(activeLat())) return null;
    const h=Astronomy.Horizon(when,obs(),raDeg/15,dec,'normal');
    return {az:h.azimuth,alt:h.altitude};
  }
  function aimCustom(name, when, body, ra, dec){
    customAim={name,when,body,ra,dec};
    let opt=$('aimTarget').querySelector('option[value="custom"]');
    if(!opt){ opt=document.createElement('option'); opt.value='custom'; opt.textContent='Evento / posição prevista'; $('aimTarget').appendChild(opt); }
    $('aimTarget').value='custom'; showView('aim'); updateAimTarget();
  }

  // Use the selected map/manual point for all astronomical calculations.
  horizon = function(bodyName,when=new Date(),lat=activeLat(),lon=activeLon()){
    if(!ready() || !Number.isFinite(lat)||!Number.isFinite(lon)) return null;
    const o=new Astronomy.Observer(lat,lon,0),eq=Astronomy.Equator(Astronomy.Body[bodyName],when,o,true,true),hh=Astronomy.Horizon(when,o,eq.ra,eq.dec,'normal');
    return {az:hh.azimuth,alt:hh.altitude};
  };

  const oldUpdateAimTarget=updateAimTarget;
  updateAimTarget=function(){
    if($('aimTarget').value!=='custom'){ customAim=null; return oldUpdateAimTarget(); }
    if(!customAim || !ready() || !Number.isFinite(activeLat())){ setTarget(null); return; }
    const h=customAim.body?hBody(customAim.body,customAim.when):hRaDec(customAim.ra,customAim.dec,customAim.when);
    if($('aimWhen')) $('aimWhen').textContent=`${customAim.name} · ${fmt(customAim.when)}`;
    setTarget(h);
  };

  // 2027 only. Keep the verified path already present in the base app.
  try{
    delete ECLIPSES['2026']; state.year='2027';
    for(const id of ['eventYear','mapYear','aimEclipse']){
      const el=$(id); if(el){ el.innerHTML='<option value="2027">2 agosto 2027</option>'; el.value='2027'; }
    }
    drawPath();
  }catch(e){}

  // Sun path panel.
  const bodyPanel=$('bodyList')?.closest('.panel');
  if(bodyPanel){
    const p=document.createElement('div'); p.className='panel ap-v02';
    p.innerHTML=`<h2>Trajetória diária do Sol</h2>
      <div class="row"><label>Data<input id="v02SunDate" type="date"></label><button id="v02SunNow">Agora</button></div>
      <canvas id="v02SunCanvas" class="v02-sun"></canvas>
      <div id="v02SunInfo" class="small">A aguardar posição.</div>
      <div class="v02-slider"><strong id="v02SunClock">—</strong><span id="v02SunAzAlt">—</span></div>
      <input id="v02SunTime" type="range" min="0" max="1439" step="5">
      <button id="v02SunAim" class="primary v02-full">Pré-visualizar esta posição na Mira</button>
      <p class="small">Círculo exterior = horizonte; centro = zénite. A linha mostra o percurso do Sol e os pontos assinalam horas inteiras.</p>`;
    bodyPanel.after(p);
  }
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  function atMinute(ds,min){const [y,m,d]=ds.split('-').map(Number);return new Date(y,m-1,d,0,+min,0,0);}
  function sunXY(h,cx,cy,R){const rr=(90-Math.max(0,Math.min(90,h.alt)))/90*R,a=h.az*Math.PI/180;return[cx+rr*Math.sin(a),cy-rr*Math.cos(a)];}
  function drawSun(){
    const c=$('v02SunCanvas'); if(!c||!ready()||!Number.isFinite(activeLat())) return;
    const rect=c.getBoundingClientRect(),w=Math.max(280,rect.width),h=Math.max(280,rect.height),dpr=Math.min(2,devicePixelRatio||1); c.width=w*dpr;c.height=h*dpr;
    const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*.39;
    x.strokeStyle='#516079';x.fillStyle='#aab7cc';x.lineWidth=1;x.font='12px system-ui';x.textAlign='center';x.textBaseline='middle';
    [0,30,60].forEach(alt=>{const r=(90-alt)/90*R;x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.stroke();});
    [['N',0],['E',90],['S',180],['W',270]].forEach(([t,a])=>{const q=a*Math.PI/180;x.fillText(t,cx+(R+18)*Math.sin(q),cy-(R+18)*Math.cos(q));});
    const ds=$('v02SunDate').value, pts=[]; for(let m=0;m<1440;m+=5){const hh=hBody('Sun',atMinute(ds,m));if(hh&&hh.alt>=0)pts.push({m,h:hh});}
    if(pts.length){x.strokeStyle='#f6c453';x.lineWidth=3;x.beginPath();pts.forEach((p,i)=>{const [px,py]=sunXY(p.h,cx,cy,R);i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();
      x.fillStyle='#f6c453';x.font='10px system-ui';pts.filter(p=>p.m%60===0).forEach(p=>{const [px,py]=sunXY(p.h,cx,cy,R);x.beginPath();x.arc(px,py,3,0,Math.PI*2);x.fill();x.fillText(String(Math.floor(p.m/60)).padStart(2,'0'),px+10,py-7);});
      const rise=pts[0],set=pts[pts.length-1],max=pts.reduce((a,b)=>a.h.alt>b.h.alt?a:b);const ft=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
      $('v02SunInfo').textContent=`Nascer ≈ ${ft(rise.m)} · altura máxima ${max.h.alt.toFixed(1)}° · pôr ≈ ${ft(set.m)} (hora do telemóvel)`;
    }else $('v02SunInfo').textContent='Sol abaixo do horizonte durante toda a data selecionada.';
    const min=+$('v02SunTime').value,when=atMinute(ds,min),hh=hBody('Sun',when);$('v02SunClock').textContent=new Intl.DateTimeFormat('pt-PT',{hour:'2-digit',minute:'2-digit'}).format(when);$('v02SunAzAlt').textContent=hh?`AZ ${hh.az.toFixed(1)}° · ALT ${hh.alt.toFixed(1)}°`:'—';
    if(hh&&hh.alt>=0){const [px,py]=sunXY(hh,cx,cy,R);x.fillStyle='#fb923c';x.beginPath();x.arc(px,py,7,0,Math.PI*2);x.fill();}
  }
  if($('v02SunDate')){$('v02SunDate').value=today();const n=new Date(),m=n.getHours()*60+n.getMinutes();$('v02SunTime').value=m;$('v02SunTime').oninput=drawSun;$('v02SunDate').onchange=drawSun;$('v02SunNow').onclick=()=>{const n=new Date();$('v02SunDate').value=today();$('v02SunTime').value=n.getHours()*60+n.getMinutes();drawSun()};$('v02SunAim').onclick=()=>{const w=atMinute($('v02SunDate').value,+$('v02SunTime').value);aimCustom('Sol — posição prevista',w,'Sun')};}

  // Replace Events with useful tests up to the 2027 eclipse while preserving IDs used by base code.
  const ev=$('view-events');
  if(ev) ev.innerHTML=`<div class="panel"><h2>Eclipse total de 2 agosto 2027</h2><select id="eventYear" hidden><option value="2027">2027</option></select><div id="eventSummary" class="event-card">A aguardar posição.</div></div>
    <div class="panel"><h2>Fenómenos calculados</h2><div id="v02Events" class="v02-events"></div><p class="small">Efemérides calculadas para o ponto selecionado, até ao eclipse de 2027.</p></div>
    <div class="panel"><h2>Chuvas de meteoros — teste da Mira</h2><div id="v02Meteors" class="v02-events"></div><p class="small">Os radiantes e máximos são aproximados e destinam-se a orientar a zona do céu, não um ponto luminoso individual.</p></div>`;

  function nextFullMoon(start){let q=Astronomy.SearchMoonQuarter(start);for(let i=0;i<8;i++){if(q.quarter===2)return q.time.date;q=Astronomy.NextMoonQuarter(q)}return null;}
  function row(title,date,body,note=''){const h=body?hBody(body,date):null;return `<div class="v02-event"><div><strong>${title}</strong><div class="small">${fmt(date)}${note?` · ${note}`:''}${h?`<br>${h.alt>=0?'acima':'abaixo'} do horizonte · AZ ${h.az.toFixed(0)}° · ALT ${h.alt.toFixed(0)}°`:''}</div></div>${body?`<button data-v02body="${body}" data-v02time="${date.toISOString()}" data-v02name="${title}">Posição</button>`:''}</div>`;}
  function renderEvents(){
    if(!ready()||!Number.isFinite(activeLat())||!$('v02Events'))return; const now=new Date(),out=[];
    try{const e=Astronomy.SearchLunarEclipse(now);if(e.peak.date<cutoff)out.push(row(`Eclipse lunar ${e.kind==='total'?'total':e.kind==='partial'?'parcial':'penumbral'}`,e.peak.date,'Moon',`obsc. ${Math.round(100*(e.obscuration||0))}%`));}catch(e){}
    try{const d=nextFullMoon(now);if(d&&d<cutoff)out.push(row('Próxima Lua cheia',d,'Moon'));}catch(e){}
    ['Mars','Jupiter','Saturn'].forEach(b=>{try{const d=Astronomy.SearchRelativeLongitude(Astronomy.Body[b],0,now).date;if(d<cutoff)out.push(row(`Oposição de ${bodyNames[b]}`,d,b));}catch(e){}});
    ['Mercury','Venus'].forEach(b=>{try{const e=Astronomy.SearchMaxElongation(Astronomy.Body[b],now);if(e.time.date<cutoff)out.push(row(`Máxima elongação de ${bodyNames[b]}`,e.time.date,b,`${e.elongation.toFixed(1)}° · ${e.visibility==='morning'?'manhã':'tarde/noite'}`));}catch(e){}});
    $('v02Events').innerHTML=out.join('')||'<div class="small">Sem eventos calculados.</div>';
    document.querySelectorAll('[data-v02body]').forEach(b=>b.onclick=()=>aimCustom(b.dataset.v02name,new Date(b.dataset.v02time),b.dataset.v02body));
    const list=METEORS.filter(m=>new Date(m[1])>=new Date(now.getTime()-86400000)&&new Date(m[1])<cutoff);$('v02Meteors').innerHTML=list.map((m,i)=>{const d=new Date(m[1]),h=hRaDec(m[2],m[3],d);return `<div class="v02-event"><div><strong>${m[0]}</strong><div class="small">${fmt(d)} · ZHR ${m[4]} · ${m[5]}${h?`<br>radiante: AZ ${h.az.toFixed(0)}° · ALT ${h.alt.toFixed(0)}°`:''}</div></div><button data-v02meteor="${i}">Radiante</button></div>`}).join('');
    document.querySelectorAll('[data-v02meteor]').forEach(b=>b.onclick=()=>{const m=list[+b.dataset.v02meteor];aimCustom(`Radiante — ${m[0]}`,new Date(m[1]),null,m[2],m[3])});
  }

  // Make portrait/landscape/table use explicit. Sensor in v0.2 uses the same physical top edge as sight line.
  const aimPanel=$('view-aim')?.querySelector('.panel');
  if(aimPanel){const info=document.createElement('div');info.className='v02-orientation';info.innerHTML=`<strong>Orientação livre</strong><div id="v02Orientation" class="small"></div><div class="small">Pode usar retrato, paisagem ou pousar o telefone numa plataforma. A linha de mira é sempre a <b>aresta física superior do telemóvel</b> (lado da câmara/auricular). Ao pousar numa mesa, essa aresta fornece o azimute horizontal; inclinando a plataforma, passa também a fornecer a elevação.</div>`;aimPanel.appendChild(info);}
  function orient(){const a=(screen.orientation&&Number.isFinite(screen.orientation.angle))?screen.orientation.angle:(window.orientation||0);if($('v02Orientation'))$('v02Orientation').textContent=`Ecrã: ${Math.abs(a)%180===90?'paisagem':'retrato'} · rotação ${a}°`;}
  window.addEventListener('orientationchange',()=>setTimeout(orient,100)); if(screen.orientation)screen.orientation.addEventListener?.('change',orient); orient();

  // Refresh v0.2 content whenever GPS/manual point changes.
  const oldSetCalc=setCalc; setCalc=function(lat,lon,recenter=false){oldSetCalc(lat,lon,recenter);setTimeout(()=>{drawSun();renderEvents();updateBodies();updateAimTarget()},0)};
  const oldSetGps=setGps; setGps=function(lat,lon,acc){oldSetGps(lat,lon,acc);setTimeout(()=>{drawSun();renderEvents()},0)};

  // Set 2027 in base UI and identify the extension.
  const badge=$('nativeBadge'); if(badge)badge.textContent='AstroPointer v0.2 · Android nativo';
  setTimeout(()=>{try{state.year='2027';if($('mapYear'))$('mapYear').value='2027';if($('aimEclipse'))$('aimEclipse').value='2027';drawPath();updateEventSummary();drawSun();renderEvents();}catch(e){}},500);
  window.addEventListener('resize',()=>setTimeout(drawSun,120));
})();
