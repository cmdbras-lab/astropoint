
import * as Astronomy from 'https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/+esm';
const ECLIPSES = {
  '2026': {
    label: '12 agosto 2026', targetDate: '2026-08-12', searchStart: '2026-08-11T00:00:00Z',
    defaultView: [41.9, -6.7, 7],
    // Segmento NASA de maior interesse operacional: Atlântico NE, Península Ibérica e Mediterrâneo ocidental.
    rows: [
      ['18:10','53 32.8N 015 30.2W','53 09.1N 020 29.1W','53 22.3N 018 03.4W'],
      ['18:12','52 31.2N 014 38.8W','52 10.6N 019 38.8W','52 22.3N 017 12.7W'],
      ['18:14','51 28.7N 013 42.7W','51 11.6N 018 45.3W','51 21.6N 016 18.2W'],
      ['18:16','50 25.0N 012 41.1W','50 11.7N 017 47.9W','50 20.0N 015 19.0W'],
      ['18:18','49 19.8N 011 32.8W','49 10.9N 016 45.9W','49 17.1N 014 14.3W'],
      ['18:20','48 12.5N 010 16.0W','48 08.8N 015 38.3W','48 12.7N 013 02.9W'],
      ['18:22','47 02.3N 008 48.1W','47 05.0N 014 23.8W','47 06.1N 011 42.9W'],
      ['18:24','45 48.1N 007 04.6W','45 59.0N 013 00.5W','45 56.6N 010 11.4W'],
      ['18:26','44 27.4N 004 56.9W','44 49.9N 011 25.2W','44 42.8N 008 23.9W'],
      ['18:28','42 54.5N 002 05.1W','43 36.4N 009 33.1W','43 22.3N 006 11.3W'],
      ['18:30','40 39.9N 003 17.7E','42 15.8N 007 14.2W','41 49.0N 003 11.1W'],
      ['18:32',null,'40 41.0N 004 02.4W','39 24.5N 002 57.0E'],
      ['lim','39 42.5N 006 20.4E','37 41.4N 004 32.4E','38 40.8N 005 24.9E']
    ]
  },
  '2027': {
    label: '2 agosto 2027', targetDate: '2027-08-02', searchStart: '2027-08-01T00:00:00Z',
    defaultView: [34.5, -4.0, 4],
    // Segmento NASA: aproximação atlântica, Estreito/Gibraltar, Norte de África, Egito e Mar Vermelho.
    rows: [
      ['08:38','35 58.3N 015 16.9W','34 01.3N 014 04.2W','35 00.1N 014 38.4W'],
      ['08:40','36 14.4N 013 01.4W','34 14.5N 011 57.8W','35 14.6N 012 27.6W'],
      ['08:42','36 26.7N 010 55.3W','34 24.4N 009 59.9W','35 25.7N 010 25.8W'],
      ['08:44','36 36.0N 008 57.0W','34 31.7N 008 09.1W','35 33.9N 008 31.3W'],
      ['08:46','36 42.5N 007 05.2W','34 36.5N 006 24.4W','35 39.6N 006 43.3W'],
      ['08:48','36 46.8N 005 19.2W','34 39.3N 004 45.0W','35 43.1N 005 00.6W'],
      ['08:50','36 48.9N 003 38.2W','34 40.2N 003 10.2W','35 44.6N 003 22.9W'],
      ['08:52','36 49.2N 002 01.7W','34 39.5N 001 39.6W','35 44.3N 001 49.4W'],
      ['08:54','36 47.8N 000 29.2W','34 37.2N 000 12.7W','35 42.5N 000 19.8W'],
      ['08:56','36 44.8N 000 59.6E','34 33.6N 001 10.8E','35 39.1N 001 06.3E'],
      ['08:58','36 40.4N 002 25.2E','34 28.7N 002 31.1E','35 34.5N 002 29.2E'],
      ['09:00','36 34.8N 003 47.7E','34 22.6N 003 48.7E','35 28.6N 003 49.1E'],
      ['09:04','36 19.9N 006 24.4E','34 07.2N 006 16.0E','35 13.5N 006 21.0E'],
      ['09:08','36 00.8N 008 51.4E','33 48.1N 008 34.3E','34 54.3N 008 43.5E'],
      ['09:12','35 38.0N 011 09.7E','33 25.5N 010 44.6E','34 31.6N 010 57.6E'],
      ['09:16','35 11.9N 013 20.4E','32 59.9N 012 47.8E','34 05.8N 013 04.5E'],
      ['09:20','34 42.8N 015 24.3E','32 31.6N 014 44.8E','33 37.1N 015 04.8E'],
      ['09:24','34 11.0N 017 22.0E','32 00.7N 016 36.0E','33 05.8N 016 59.2E'],
      ['09:28','33 36.8N 019 14.2E','31 27.6N 018 22.2E','32 32.1N 018 48.3E'],
      ['09:32','33 00.2N 021 01.3E','30 52.3N 020 03.8E','31 56.2N 020 32.6E'],
      ['09:36','32 21.5N 022 43.8E','30 15.1N 021 41.3E','31 18.2N 022 12.5E'],
      ['09:40','31 40.8N 024 22.2E','29 36.0N 023 14.9E','30 38.3N 023 48.5E'],
      ['09:44','30 58.3N 025 56.8E','28 55.1N 024 45.1E','29 56.6N 025 20.8E'],
      ['09:48','30 14.0N 027 27.9E','28 12.5N 026 12.3E','29 13.2N 026 49.9E'],
      ['09:52','29 28.0N 028 56.0E','27 28.3N 027 36.7E','28 28.1N 028 16.1E'],
      ['09:56','28 40.5N 030 21.2E','26 42.6N 028 58.5E','27 41.5N 029 39.6E'],
      ['10:00','27 51.4N 031 44.0E','25 55.3N 030 18.2E','26 53.3N 031 00.8E'],
      ['10:04','27 00.8N 033 04.6E','25 06.6N 031 36.0E','26 03.7N 032 20.0E'],
      ['10:08','26 08.7N 034 23.2E','24 16.5N 032 52.0E','25 12.6N 033 37.3E'],
      ['10:12','25 15.2N 035 40.2E','23 24.9N 034 06.6E','24 20.1N 034 53.1E'],
      ['10:16','24 20.3N 036 55.8E','22 31.9N 035 20.1E','23 26.2N 036 07.6E'],
      ['10:20','23 24.0N 038 10.3E','21 37.4N 036 32.6E','22 30.8N 037 21.1E'],
      ['10:24','22 26.3N 039 24.0E','20 41.6N 037 44.4E','21 34.0N 038 33.8E'],
      ['10:28','21 27.1N 040 37.1E','19 44.2N 038 55.9E','20 35.8N 039 46.1E'],
      ['10:32','20 26.5N 041 50.0E','18 45.4N 040 07.2E','19 36.1N 040 58.2E'],
      ['10:36','19 24.4N 043 02.9E','17 45.1N 041 18.7E','18 34.9N 042 10.4E'],
      ['10:40','18 20.7N 044 16.2E','16 43.1N 042 30.7E','17 32.0N 043 23.0E']
    ]
  }
};
const $=id=>document.getElementById(id);
const BODIES=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune'];
const NAMES={Sun:'Sol',Moon:'Lua',Mercury:'Mercúrio',Venus:'Vénus',Mars:'Marte',Jupiter:'Júpiter',Saturn:'Saturno',Uranus:'Urano',Neptune:'Neptuno'};
const state={gpsLat:null,gpsLon:null,gpsAcc:null,calcLat:null,calcLon:null,map:null,gpsMarker:null,selMarker:null,band:null,center:null,north:null,south:null,year:'2026',lastEclipse:null,phoneAzRaw:null,phoneAltRaw:null,phoneAz:null,phoneAlt:null,declination:0,sensorAccuracy:'—',azOffset:0,altOffset:0,calValid:false,lastAligned:false};
function norm360(d){return ((d%360)+360)%360} function signed(d){d=norm360(d);return d>180?d-360:d} function rad(d){return d*Math.PI/180}
function fmtDur(ms){if(!Number.isFinite(ms)||ms<0)return'—';const s=Math.round(ms/1000),m=Math.floor(s/60);return m?`${m}m ${String(s%60).padStart(2,'0')}s`:`${s}s`}
function fmtTime(ev){if(!ev?.time?.date)return'—';return new Intl.DateTimeFormat('pt-PT',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(ev.time.date)}
function sameDate(d,t){return d.toISOString().slice(0,10)===t}
function dmToDec(text){if(!text)return null;const m=text.trim().match(/^(\d+)\s+([\d.]+)([NS])\s+(\d+)\s+([\d.]+)([EW])$/);if(!m)return null;let a=+m[1]+ +m[2]/60,b=+m[4]+ +m[5]/60;if(m[3]==='S')a=-a;if(m[6]==='W')b=-b;return[a,b]}
function pathData(y){const r=ECLIPSES[y].rows;return{north:r.map(x=>dmToDec(x[1])).filter(Boolean),south:r.map(x=>dmToDec(x[2])).filter(Boolean),center:r.map(x=>dmToDec(x[3])).filter(Boolean)}}
function pointSegKm(p,a,b){const lat0=rad(p[0]),kx=111.320*Math.cos(lat0),ky=110.574,ax=(a[1]-p[1])*kx,ay=(a[0]-p[0])*ky,bx=(b[1]-p[1])*kx,by=(b[0]-p[0])*ky,vx=bx-ax,vy=by-ay,den=vx*vx+vy*vy;let t=den?-(ax*vx+ay*vy)/den:0;t=Math.max(0,Math.min(1,t));return Math.hypot(ax+t*vx,ay+t*vy)}
function lineDist(p,l){let best=Infinity;for(let i=0;i<l.length-1;i++)best=Math.min(best,pointSegKm(p,l[i],l[i+1]));return best}
function initMap(){if(!window.L){$('map').textContent='Mapa indisponível sem ligação de rede.';return}const v=ECLIPSES[state.year].defaultView;state.map=L.map('map').setView([v[0],v[1]],v[2]);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(state.map);state.map.on('click',e=>setCalc(e.latlng.lat,e.latlng.lng,true));drawPath()}
function clearLayer(k){if(state[k]&&state.map){state.map.removeLayer(state[k]);state[k]=null}}
function drawPath(){if(!state.map)return;['band','center','north','south'].forEach(clearLayer);const d=pathData(state.year),poly=[...d.north,...d.south.slice().reverse()];state.band=L.polygon(poly,{color:'#f6c453',weight:2,fillColor:'#f6c453',fillOpacity:.16}).addTo(state.map);state.center=L.polyline(d.center,{color:'#f6c453',weight:3,dashArray:'8 6'}).addTo(state.map);state.north=L.polyline(d.north,{color:'#f6c453',weight:1}).addTo(state.map);state.south=L.polyline(d.south,{color:'#f6c453',weight:1}).addTo(state.map)}
function drawMarkers(recenter=false){if(!state.map)return;if(Number.isFinite(state.gpsLat)){const ll=[state.gpsLat,state.gpsLon];if(!state.gpsMarker)state.gpsMarker=L.circleMarker(ll,{radius:8,color:'#08111f',weight:3,fillColor:'#7dd3fc',fillOpacity:1}).addTo(state.map);else state.gpsMarker.setLatLng(ll)}if(Number.isFinite(state.calcLat)){const ll=[state.calcLat,state.calcLon];const same=Math.abs(state.calcLat-state.gpsLat)<1e-7&&Math.abs(state.calcLon-state.gpsLon)<1e-7;if(same){if(state.selMarker){state.map.removeLayer(state.selMarker);state.selMarker=null}}else{if(!state.selMarker)state.selMarker=L.circleMarker(ll,{radius:9,color:'#08111f',weight:3,fillColor:'#f6c453',fillOpacity:1}).addTo(state.map);else state.selMarker.setLatLng(ll)}if(recenter)state.map.setView(ll,Math.max(10,state.map.getZoom()))}}
function setCalc(lat,lon,recenter=false){state.calcLat=lat;state.calcLon=lon;$('latInput').value=lat.toFixed(6);$('lonInput').value=lon.toFixed(6);drawMarkers(recenter);calcEclipse();}
function setGps(lat,lon,acc){state.gpsLat=lat;state.gpsLon=lon;state.gpsAcc=acc;$('gpsStatus').textContent=`GPS ${lat.toFixed(5)}, ${lon.toFixed(5)}${Number.isFinite(acc)?` · ±${Math.round(acc)} m`:''}`;if(state.calcLat==null)setCalc(lat,lon,true);else drawMarkers(false);updateBodies();updateAimTarget();}
function observerFor(lat,lon){return new Astronomy.Observer(lat,lon,0)}
function horizon(bodyName,when=new Date(),lat=state.gpsLat,lon=state.gpsLon){if(!Number.isFinite(lat))return null;const obs=observerFor(lat,lon),body=Astronomy.Body[bodyName],eq=Astronomy.Equator(body,when,obs,true,true),h=Astronomy.Horizon(when,obs,eq.ra,eq.dec,'normal');return{az:h.azimuth,alt:h.altitude}}
function localEclipse(y,lat,lon){if(!Number.isFinite(lat))return null;const cfg=ECLIPSES[y],e=Astronomy.SearchLocalSolarEclipse(new Date(cfg.searchStart),observerFor(lat,lon));return e&&sameDate(e.peak.time.date,cfg.targetDate)?e:null}
function calcEclipse(){if(!Number.isFinite(state.calcLat))return;const e=localEclipse(state.year,state.calcLat,state.calcLon);state.lastEclipse=e;if(!e){$('obsc').textContent='—';$('kind').textContent='NÃO VISÍVEL';$('totDur').textContent='—';$('peakTime').textContent='—';$('contactTimes').innerHTML='';return}$('obsc').textContent=`${(e.obscuration*100).toFixed(e.obscuration>.99?3:1)}%`;$('kind').textContent=e.kind==='total'?'TOTAL':e.kind.toUpperCase();$('totDur').textContent=e.kind==='total'&&e.total_begin&&e.total_end?fmtDur(e.total_end.time.date-e.total_begin.time.date):'—';$('peakTime').textContent=fmtTime(e.peak);const d=pathData(state.year),p=[state.calcLat,state.calcLon],dc=lineDist(p,d.center),de=Math.min(lineDist(p,d.north),lineDist(p,d.south));$('edgeInfo').textContent=e.kind==='total'?`${dc.toFixed(0)} km da central · ${de.toFixed(0)} km da borda`:'fora da totalidade';$('contactTimes').innerHTML=`<span>C1</span><b>${fmtTime(e.partial_begin)}</b><span>C2</span><b>${fmtTime(e.total_begin)}</b><span>Máximo</span><b>${fmtTime(e.peak)}</b><span>C3</span><b>${fmtTime(e.total_end)}</b><span>C4</span><b>${fmtTime(e.partial_end)}</b>`;updateEventSummary();}
function updateEventSummary(){const y=$('eventYear').value,e=localEclipse(y,state.gpsLat,state.gpsLon);if(!e){$('eventSummary').innerHTML='<strong>Sem eclipse local calculável.</strong>';return}const total=e.kind==='total';$('eventSummary').innerHTML=`<strong>${ECLIPSES[y].label} — ${total?'TOTAL':e.kind.toUpperCase()}</strong><div class="times" style="margin-top:8px"><span>Obscurecimento</span><b>${(100*e.obscuration).toFixed(e.obscuration>.99?3:1)}%</b><span>Máximo</span><b>${fmtTime(e.peak)}</b><span>Totalidade</span><b>${total?fmtDur(e.total_end.time.date-e.total_begin.time.date):'—'}</b><span>Altitude do Sol</span><b>${e.peak.altitude.toFixed(1)}°</b></div><button id="aimEventBtn" class="primary" style="width:100%;margin-top:10px">Apontar para o Sol no máximo</button>`;setTimeout(()=>{const b=$('aimEventBtn');if(b)b.onclick=()=>{$('aimEclipse').value=y;$('aimTarget').value='eclipseMax';showView('aim');updateAimTarget()}},0)}
function updateBodies(){if(!Number.isFinite(state.gpsLat))return;const now=new Date(),rows=[];for(const b of BODIES){try{const h=horizon(b,now);rows.push({b,...h})}catch{}}$('bodyList').innerHTML=rows.map(r=>`<div class="body-row ${r.alt<0?'below':''}"><div><div class="name">${NAMES[r.b]}</div><div class="small">${r.alt>=0?'acima':'abaixo'} do horizonte</div></div><div class="coords2">AZ ${r.az.toFixed(1)}°<br>ALT ${r.alt.toFixed(1)}°</div><button data-body="${r.b}">Apontar</button></div>`).join('');document.querySelectorAll('[data-body]').forEach(b=>b.onclick=()=>{$('aimTarget').value=b.dataset.body;showView('aim');updateAimTarget()})}
function updateAimTarget(){if(!Number.isFinite(state.gpsLat))return;let t=$('aimTarget').value,when=new Date(),body=t;if(t==='eclipseMax'){const e=localEclipse($('aimEclipse').value,state.gpsLat,state.gpsLon);if(!e){setTarget(null);return}when=e.peak.time.date;body='Sun'}try{setTarget(horizon(body,when))}catch{setTarget(null)}}
let target=null;function setTarget(h){target=h;if(!h){$('targetAz').textContent=$('targetAlt').textContent='—';return}$('targetAz').textContent=`${h.az.toFixed(1)}°`;$('targetAlt').textContent=`${h.alt.toFixed(1)}°`;updateAim()}
function updateAim(){if(!target||!Number.isFinite(state.phoneAzRaw))return;state.phoneAz=norm360(state.phoneAzRaw+(state.calValid?state.azOffset:0));state.phoneAlt=state.phoneAltRaw+(state.calValid?state.altOffset:0);$('phoneAz').textContent=`${state.phoneAz.toFixed(1)}°`;$('phoneAlt').textContent=`${state.phoneAlt.toFixed(1)}°`;const he=signed(target.az-state.phoneAz),ve=target.alt-state.phoneAlt,cl=(x)=>Math.max(-45,Math.min(45,x));$('aimDot').style.left=`${50+cl(he)}%`;$('aimDot').style.top=`${50-cl(ve)}%`;const ok=Math.abs(he)<=2&&Math.abs(ve)<=2;$('aimDot').classList.toggle('aligned',ok);$('instruction').classList.toggle('aligned',ok);if(ok){$('instruction').textContent='ALINHADO — dentro de ±2°';if(!state.lastAligned)try{AndroidBridge.vibrate(70)}catch{}}else{const a=Math.abs(he)<.7?'mantenha o azimute':`rode ${Math.abs(he).toFixed(1)}° para ${he>0?'a direita':'a esquerda'}`,v=Math.abs(ve)<.7?'mantenha a elevação':`${ve>0?'eleve':'baixe'} ${Math.abs(ve).toFixed(1)}°`;$('instruction').textContent=`${a} · ${v}`}state.lastAligned=ok}
function loadCal(){try{const c=JSON.parse(AndroidBridge.getCalibration());state.calValid=!!c.valid;state.azOffset=+c.azOffset||0;state.altOffset=+c.altOffset||0;$('calStatus').textContent=state.calValid?`Calibração óptica ativa: ΔAZ ${state.azOffset.toFixed(1)}°, ΔALT ${state.altOffset.toFixed(1)}°.`:$('calStatus').textContent}catch{}}
function calibrateAxis(){if(!target||!Number.isFinite(state.phoneAzRaw))return;state.azOffset=signed(target.az-state.phoneAzRaw);state.altOffset=target.alt-state.phoneAltRaw;state.calValid=true;try{AndroidBridge.saveCalibration(state.azOffset,state.altOffset)}catch{};$('calStatus').textContent=`Eixo calibrado: ΔAZ ${state.azOffset.toFixed(1)}°, ΔALT ${state.altOffset.toFixed(1)}°. Confirme num segundo alvo se precisar de maior rigor.`;updateAim()}
function clearCal(){state.azOffset=state.altOffset=0;state.calValid=false;try{AndroidBridge.clearCalibration()}catch{};$('calStatus').textContent='Calibração removida. A aresta superior do telemóvel volta a ser a linha de mira.';updateAim()}
function showView(v){document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id===`view-${v}`));document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x.dataset.view===v));if(v==='map'&&state.map)setTimeout(()=>state.map.invalidateSize(),100);if(v==='aim')updateAimTarget()}
window.onNativeLocation=d=>setGps(+d.latitude,+d.longitude,+d.accuracy);window.onNativeOrientation=d=>{state.phoneAzRaw=+d.azimuthTrue;state.phoneAltRaw=+d.altitude;state.declination=+d.declination||0;state.sensorAccuracy=d.accuracy||'—';$('declination').textContent=`${state.declination.toFixed(1)}°`;$('sensorAccuracy').textContent=state.sensorAccuracy;updateAim()};window.onNativeStatus=d=>{$('nativeBadge').textContent=d.rotationSensor?'GPS + sensores nativos':'GPS nativo · sem sensor rotação';$('sensorAccuracy').textContent=d.sensorAccuracy||'—'};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>showView(b.dataset.view));$('refreshGps').onclick=()=>{try{AndroidBridge.requestLocation()}catch{}};$('useGps').onclick=()=>{if(Number.isFinite(state.gpsLat))setCalc(state.gpsLat,state.gpsLon,true)};$('recenter').onclick=()=>drawMarkers(true);$('useCoords').onclick=()=>setCalc(+$('latInput').value.replace(',','.'),+$('lonInput').value.replace(',','.'),true);$('eventYear').onchange=()=>{updateEventSummary();$('aimEclipse').value=$('eventYear').value};$('mapYear').onchange=()=>{state.year=$('mapYear').value;drawPath();calcEclipse();};$('aimTarget').onchange=updateAimTarget;$('aimEclipse').onchange=updateAimTarget;$('calAxis').onclick=calibrateAxis;$('clearCal').onclick=clearCal;
state.year='2026';$('eventYear').value='2026';$('aimEclipse').value='2026';initMap();loadCal();try{AndroidBridge.startOrientation();AndroidBridge.requestLocation()}catch{$('nativeBadge').textContent='Modo browser'};setInterval(()=>{updateBodies();if($('aimTarget').value!=='eclipseMax')updateAimTarget()},5000);
