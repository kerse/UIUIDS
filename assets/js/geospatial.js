(function(){
 'use strict';

 const assets=[
  {id:'AST-0421',name:'Northline cold-chain trailer 14',type:'vehicle',status:'critical',city:'Horgoš',country:'Serbia',lat:46.155,lng:19.973,speed:0,route:'Horgoš → Belgrade',owner:'L. Stojanovic',sla:'12 min',updated:'38 sec ago',signal:'Temperature variance +8.7°C · cargo exposure €18,420',region:'north'},
  {id:'RT-728',name:'Balkan express · customs transfer',type:'vehicle',status:'warning',city:'Subotica',country:'Serbia',lat:46.101,lng:19.667,speed:12,route:'Budapest → Belgrade',owner:'M. Nikolic',sla:'28 min',updated:'1 min ago',signal:'Border handoff is 24 minutes behind plan',region:'north'},
  {id:'AST-0269',name:'Sortation lane 04 telemetry',type:'sensor',status:'warning',city:'Niš',country:'Serbia',lat:43.321,lng:21.896,speed:0,route:'Niš regional hub',owner:'D. Ilic',sla:'46 min',updated:'2 min ago',signal:'Throughput is 18% below the shift baseline',region:'central'},
  {id:'VHC-118',name:'Adriatic linehaul 118',type:'vehicle',status:'healthy',city:'Zagreb',country:'Croatia',lat:45.815,lng:15.982,speed:74,route:'Zagreb → Belgrade',owner:'A. Horvat',sla:'On track',updated:'44 sec ago',signal:'Position and refrigeration telemetry normal',region:'north'},
  {id:'VHC-204',name:'Danube freight unit 204',type:'vehicle',status:'healthy',city:'Novi Sad',country:'Serbia',lat:45.267,lng:19.833,speed:63,route:'Novi Sad → Belgrade',owner:'I. Markovic',sla:'On track',updated:'29 sec ago',signal:'Estimated arrival 16:42 · confidence 96%',region:'north'},
  {id:'HUB-011',name:'Belgrade central cross-dock',type:'hub',status:'healthy',city:'Belgrade',country:'Serbia',lat:44.813,lng:20.461,speed:0,route:'Pan-regional hub',owner:'N. Jovanovic',sla:'99.4%',updated:'1 min ago',signal:'34 active doors · utilization 82%',region:'central'},
  {id:'SNS-441',name:'Cold-room sensor cluster 441',type:'sensor',status:'critical',city:'Sarajevo',country:'Bosnia & Herzegovina',lat:43.856,lng:18.413,speed:0,route:'Sarajevo fulfillment center',owner:'E. Hadzic',sla:'8 min',updated:'17 sec ago',signal:'Two probes exceed the 7.5°C critical threshold',region:'central'},
  {id:'VHC-310',name:'East corridor tractor 310',type:'vehicle',status:'healthy',city:'Sofia',country:'Bulgaria',lat:42.698,lng:23.322,speed:68,route:'Sofia → Niš',owner:'P. Dimitrov',sla:'On track',updated:'51 sec ago',signal:'ETA variance +3 min · fuel range 612 km',region:'central'},
  {id:'VHC-551',name:'Montenegro coastal shuttle 551',type:'vehicle',status:'warning',city:'Podgorica',country:'Montenegro',lat:42.431,lng:19.262,speed:24,route:'Podgorica → Bar',owner:'M. Vukovic',sla:'21 min',updated:'1 min ago',signal:'Hydraulic pressure fluctuating above tolerance',region:'south'},
  {id:'HUB-019',name:'Port of Bar consolidation point',type:'hub',status:'healthy',city:'Bar',country:'Montenegro',lat:42.093,lng:19.101,speed:0,route:'Adriatic port node',owner:'S. Radovic',sla:'98.8%',updated:'3 min ago',signal:'17 containers staged · gate wait 6 min',region:'south'},
  {id:'SNS-902',name:'Yard gateway sensor 902',type:'sensor',status:'offline',city:'Skopje',country:'North Macedonia',lat:41.998,lng:21.426,speed:0,route:'Skopje yard',owner:'T. Petrov',sla:'4 h',updated:'22 min ago',signal:'No heartbeat since 14:08 · field check queued',region:'south'},
  {id:'VHC-714',name:'Morava route vehicle 714',type:'vehicle',status:'healthy',city:'Kragujevac',country:'Serbia',lat:44.013,lng:20.911,speed:80,route:'Kragujevac → Niš',owner:'B. Simic',sla:'On track',updated:'42 sec ago',signal:'Cruise telemetry stable · ETA 17:06',region:'central'},
  {id:'VHC-808',name:'Drina corridor van 808',type:'vehicle',status:'healthy',city:'Tuzla',country:'Bosnia & Herzegovina',lat:44.538,lng:18.673,speed:70,route:'Tuzla → Belgrade',owner:'A. Basic',sla:'On track',updated:'58 sec ago',signal:'On planned route · load utilization 76%',region:'central'},
  {id:'VHC-410',name:'Dalmatia transfer unit 410',type:'vehicle',status:'healthy',city:'Split',country:'Croatia',lat:43.508,lng:16.440,speed:54,route:'Split → Sarajevo',owner:'K. Babic',sla:'On track',updated:'1 min ago',signal:'Next checkpoint in 41 km',region:'central'},
  {id:'VHC-617',name:'Kosovo field service 617',type:'vehicle',status:'healthy',city:'Pristina',country:'Kosovo',lat:42.663,lng:21.166,speed:66,route:'Pristina → Skopje',owner:'A. Krasniqi',sla:'On track',updated:'36 sec ago',signal:'Service inventory verified · ETA 16:51',region:'south'},
  {id:'VHC-129',name:'Vojvodina distribution unit 129',type:'vehicle',status:'healthy',city:'Zrenjanin',country:'Serbia',lat:45.381,lng:20.390,speed:58,route:'Zrenjanin → Novi Sad',owner:'J. Kovac',sla:'On track',updated:'48 sec ago',signal:'Delivery sequence 7 of 12 · no exceptions',region:'north'},
  {id:'VHC-993',name:'Southern network linehaul 993',type:'vehicle',status:'healthy',city:'Leskovac',country:'Serbia',lat:42.998,lng:21.946,speed:51,route:'Leskovac → Skopje',owner:'S. Milosevic',sla:'On track',updated:'32 sec ago',signal:'Position confidence 99.2% · ETA stable',region:'south'},
  {id:'SNS-118',name:'Belgrade air-quality sensor 118',type:'sensor',status:'healthy',city:'Belgrade',country:'Serbia',lat:44.797,lng:20.382,speed:0,route:'Belgrade central cross-dock',owner:'N. Jovanovic',sla:'99.9%',updated:'2 min ago',signal:'PM and humidity readings within governed limits',region:'central'}
 ];
 const routes=[
  {id:'northline',risk:true,points:[[46.155,19.973],[45.267,19.833],[44.813,20.461]]},
  {id:'west-east',points:[[45.815,15.982],[44.538,18.673],[44.813,20.461],[43.321,21.896],[42.698,23.322]]},
  {id:'adriatic',risk:true,points:[[43.508,16.440],[43.856,18.413],[42.431,19.262],[42.093,19.101]]},
  {id:'south',points:[[44.813,20.461],[44.013,20.911],[43.321,21.896],[42.998,21.946],[41.998,21.426]]},
  {id:'field',muted:true,points:[[42.663,21.166],[41.998,21.426]]}
 ];
 const state={query:'',status:'all',type:'all',selected:'AST-0421',sortRisk:true,routes:true,incidents:true};
 const statusRank={critical:0,warning:1,offline:2,healthy:3};
 const typeGlyph={vehicle:'V',hub:'H',sensor:'S'};
 let map,markerLayer,clusterLayer,routeLayer,incidentLayer,mapResizeObserver;
 const markerById=new Map();

 function $(id){return document.getElementById(id)}
 function escapeHTML(value){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
 function toast(message){const node=$('geo-toast');node.textContent=message;node.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.classList.remove('show'),2200)}
 function filtered(){const q=state.query.trim().toLowerCase();return assets.filter(asset=>(state.status==='all'||asset.status===state.status)&&(state.type==='all'||asset.type===state.type)&&(!q||[asset.id,asset.name,asset.city,asset.country,asset.route,asset.owner].some(value=>value.toLowerCase().includes(q)))).sort((a,b)=>state.sortRisk?statusRank[a.status]-statusRank[b.status]||a.id.localeCompare(b.id):a.id.localeCompare(b.id))}
 function syncURL(){const params=new URLSearchParams();if(state.query)params.set('q',state.query);if(state.status!=='all')params.set('status',state.status);if(state.type!=='all')params.set('type',state.type);if(state.selected)params.set('asset',state.selected);history.replaceState(null,'',`${location.pathname}${params.size?`?${params}`:''}`)}
 function readURL(){const params=new URLSearchParams(location.search);state.query=params.get('q')||'';state.status=['all','critical','warning','healthy','offline'].includes(params.get('status'))?params.get('status'):'all';state.type=['all','vehicle','hub','sensor'].includes(params.get('type'))?params.get('type'):'all';const selected=params.get('asset');if(selected&&assets.some(asset=>asset.id===selected))state.selected=selected}

 function iconFor(asset,selected=false){return L.divIcon({className:'',html:`<span class="geo-map-marker ${asset.status}${selected?' is-selected':''}" data-map-id="${asset.id}" aria-hidden="true">${typeGlyph[asset.type]}</span>`,iconSize:[27,27],iconAnchor:[14,14],tooltipAnchor:[0,-15]})}
 function clusterIcon(items){const risk=items.some(asset=>asset.status==='critical'||asset.status==='warning');return L.divIcon({className:'',html:`<span class="geo-map-cluster${risk?' has-risk':''}" aria-hidden="true">${items.length}</span>`,iconSize:[34,34],iconAnchor:[17,17]})}
 function createMarker(asset){const marker=L.marker([asset.lat,asset.lng],{icon:iconFor(asset,asset.id===state.selected),keyboard:true,title:`${asset.id} · ${asset.name} · ${asset.status}`});marker.on('click',()=>selectAsset(asset.id,true));marker.on('mouseover focus',()=>showReadout(asset));marker.bindTooltip(`<b>${escapeHTML(asset.id)}</b> · ${escapeHTML(asset.city)}<br>${escapeHTML(asset.signal)}`,{direction:'top',opacity:1});markerById.set(asset.id,marker);return marker}
 function showReadout(asset){$('geo-hover-readout').textContent=`${asset.id} · ${asset.city} · ${asset.signal}`}
 function renderMapLayers(list){
  markerLayer.clearLayers();clusterLayer.clearLayers();incidentLayer.clearLayers();markerById.clear();
  const visibleIds=new Set(list.map(asset=>asset.id));
  routeLayer.clearLayers();if(state.routes)routes.forEach(route=>L.polyline(route.points,{className:`geo-route${route.risk?' is-risk':''}${route.muted?' is-muted':''}`,interactive:false}).addTo(routeLayer));
  if(state.incidents)list.filter(asset=>asset.status==='critical'||asset.status==='warning').forEach(asset=>L.circleMarker([asset.lat,asset.lng],{radius:16,stroke:false,fillColor:asset.status==='critical'?'#bd3232':'#b66700',fillOpacity:.14,interactive:false}).addTo(incidentLayer));
  if(map.getZoom()<7){
   ['north','central','south'].forEach(region=>{const items=list.filter(asset=>asset.region===region);if(!items.length)return;const lat=items.reduce((sum,a)=>sum+a.lat,0)/items.length;const lng=items.reduce((sum,a)=>sum+a.lng,0)/items.length;const marker=L.marker([lat,lng],{icon:clusterIcon(items),keyboard:true,title:`${items.length} assets in ${region} region`}).addTo(clusterLayer);marker.on('click',()=>map.fitBounds(L.latLngBounds(items.map(a=>[a.lat,a.lng])),{padding:[60,60],maxZoom:9}));marker.bindTooltip(`${items.length} assets · ${items.filter(a=>a.status==='critical'||a.status==='warning').length} at risk`,{direction:'top'});});
  }else list.forEach(asset=>createMarker(asset).addTo(markerLayer));
  if(state.selected&&!visibleIds.has(state.selected)){state.selected=null}
  $('geo-zoom-level').textContent=map.getZoom()<7?'Regional clusters':map.getZoom()<9?'Network detail':'Asset detail';
 }
 function renderList(list){
  $('geo-list-count').textContent=`${list.length} of ${assets.length} visible`;
  $('geo-asset-list').innerHTML=list.map(asset=>`<button class="geo-asset-row${asset.id===state.selected?' is-selected':''}" type="button" role="option" aria-selected="${asset.id===state.selected}" data-asset-id="${asset.id}"><span class="geo-asset-symbol ${asset.status}" aria-hidden="true">${typeGlyph[asset.type]}</span><span class="geo-asset-copy"><strong>${escapeHTML(asset.id)} · ${escapeHTML(asset.name)}</strong><span>${escapeHTML(asset.city)} · ${escapeHTML(asset.route)}</span></span><span class="geo-asset-meta"><b>${asset.speed?`${asset.speed} km/h`:'Stationary'}</b><span>${escapeHTML(asset.updated)}</span></span></button>`).join('');
  $('geo-empty').hidden=Boolean(list.length);$('geo-asset-list').hidden=!list.length;
 }
 function renderInspector(){
  const asset=assets.find(item=>item.id===state.selected);$('geo-inspector-title').textContent=asset?asset.id:'No selection';
  if(!asset){$('geo-inspector-content').innerHTML='<div class="geo-inspector-placeholder"><strong>Select an asset</strong><span>Choose a marker or a list row to inspect operational context.</span></div>';return}
  $('geo-inspector-content').innerHTML=`<div class="geo-inspector-status"><span class="geo-status-badge ${asset.status}">${asset.status[0].toUpperCase()+asset.status.slice(1)}</span><span class="geo-inspector-updated">${escapeHTML(asset.updated)}</span></div><div><h3 class="geo-inspector-name">${escapeHTML(asset.name)}</h3><p class="geo-inspector-location">${escapeHTML(asset.city)}, ${escapeHTML(asset.country)} · ${asset.lat.toFixed(3)}, ${asset.lng.toFixed(3)}</p><div class="geo-inspector-signal ${asset.status}">${escapeHTML(asset.signal)}</div></div><dl><dt>Asset type</dt><dd>${asset.type[0].toUpperCase()+asset.type.slice(1)}</dd><dt>Route / node</dt><dd title="${escapeHTML(asset.route)}">${escapeHTML(asset.route)}</dd><dt>Owner</dt><dd>${escapeHTML(asset.owner)}</dd><dt>Current speed</dt><dd>${asset.speed?`${asset.speed} km/h`:'Stationary'}</dd><dt>Response SLA</dt><dd>${escapeHTML(asset.sla)}</dd><dt>Coordinates</dt><dd>${asset.lat.toFixed(4)}, ${asset.lng.toFixed(4)}</dd></dl><div class="geo-inspector-actions"><button type="button" data-geo-action="detail">Open full detail</button><button type="button" data-geo-action="task">Create task</button></div>`;
 }
 function renderSummary(list){
  const risk=list.filter(asset=>asset.status==='critical'||asset.status==='warning').length;const moving=list.filter(asset=>asset.speed>0).length;
  $('geo-visible-count').textContent=list.length;$('geo-risk-count').textContent=risk;$('geo-moving-count').textContent=moving;
  const chips=[];if(state.status!=='all')chips.push(state.status);if(state.type!=='all')chips.push(state.type);if(state.query)chips.push(`“${state.query}”`);$('geo-filter-summary').innerHTML=chips.map(value=>`<span class="geo-filter-chip">${escapeHTML(value)}</span>`).join('');
 }
 function render(){const list=filtered();renderList(list);renderMapLayers(list);renderInspector();renderSummary(list);syncURL()}
 function selectAsset(id,focusMap=false){state.selected=id;const asset=assets.find(item=>item.id===id);if(focusMap&&asset){if(map.getZoom()<7)map.setZoom(7);map.panTo([asset.lat,asset.lng],{animate:true})}render()}
 function reset(){state.query='';state.status='all';state.type='all';$('geo-search').value='';$('geo-status').value='all';$('geo-type').value='all';map.setView([44.2,20.1],6);render()}

 function initMap(){
  map=L.map('geo-map',{center:[44.2,20.1],zoom:6,minZoom:5,maxZoom:12,zoomControl:true});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
  routeLayer=L.layerGroup().addTo(map);incidentLayer=L.layerGroup().addTo(map);clusterLayer=L.layerGroup().addTo(map);markerLayer=L.layerGroup().addTo(map);
  map.on('zoomend',()=>renderMapLayers(filtered()));
  map.on('click',event=>{if(event.originalEvent.target.closest?.('.geo-map-marker,.geo-map-cluster'))return;$('geo-hover-readout').textContent='Hover or focus a marker for exact values.'});
  document.addEventListener('ops:themechange',()=>setTimeout(()=>map.invalidateSize(),0));
  if('ResizeObserver'in window){mapResizeObserver=new ResizeObserver(()=>map.invalidateSize({pan:false,animate:false}));mapResizeObserver.observe($('geo-map-canvas'))}
 }
 function bind(){
  $('geo-search').addEventListener('input',event=>{state.query=event.target.value;render()});
  $('geo-status').addEventListener('change',event=>{state.status=event.target.value;render()});
  $('geo-type').addEventListener('change',event=>{state.type=event.target.value;render()});
  $('geo-asset-list').addEventListener('click',event=>{const row=event.target.closest('[data-asset-id]');if(row)selectAsset(row.dataset.assetId,true)});
  $('geo-sort').addEventListener('click',()=>{state.sortRisk=!state.sortRisk;$('geo-sort').textContent=state.sortRisk?'Risk ↓':'ID ↑';render()});
  document.querySelectorAll('[data-layer]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.layer;state[key]=!state[key];button.classList.toggle('is-active',state[key]);button.setAttribute('aria-pressed',String(state[key]));renderMapLayers(filtered())}));
  $('geo-reset').addEventListener('click',reset);$('geo-empty-reset').addEventListener('click',reset);
  $('geo-inspector-close').addEventListener('click',()=>{state.selected=null;render()});
  $('geo-inspector').addEventListener('click',event=>{const action=event.target.closest('[data-geo-action]')?.dataset.geoAction;if(action)toast(action==='detail'?`Opening ${state.selected} full detail`:`Task draft created for ${state.selected}`)});
  $('geo-period').addEventListener('change',event=>{const label=event.target.options[event.target.selectedIndex].text;$('geo-map-caption').textContent=`${label} position, route state and incident layer`;toast(`Map period changed to ${label}`)});
  $('geo-share').addEventListener('click',async()=>{syncURL();try{await navigator.clipboard.writeText(location.href);toast('Shareable map URL copied')}catch(_){toast('Shareable view is ready in the address bar')}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&state.selected){state.selected=null;render()}});
 }
 function init(){
  if(!window.L){$('geo-map').innerHTML='<div class="geo-empty"><strong>Map tiles unavailable</strong><span>The asset list and inspector remain operational.</span></div>';return}
  readURL();$('geo-search').value=state.query;$('geo-status').value=state.status;$('geo-type').value=state.type;initMap();bind();render();setTimeout(()=>map.invalidateSize(),50);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
