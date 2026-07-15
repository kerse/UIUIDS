(()=>{
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],D=window.OpsData;
  const tasks=[...D.tasks,
    {id:'OPS-2168',title:'Restore relay 3 packet-loss threshold',priority:'P1',assignee:'L. Stojanovic',sla:'18 min',state:'New',next:'Confirm field link health'},
    {id:'OPS-2161',title:'Validate supplier July cohort sample mix',priority:'P2',assignee:'I. Markovic',sla:'1 h',state:'In progress',next:'Compare input cohorts'},
    {id:'OPS-2156',title:'Check return allocation at Bar port',priority:'P2',assignee:'A. Jovanovic',sla:'1 h 35 min',state:'Waiting',next:'Await carrier manifest'},
    {id:'OPS-2149',title:'Review cross-border toll variance',priority:'P3',assignee:'D. Tomic',sla:'4 h',state:'New',next:'Validate two toll records'},
    {id:'OPS-2141',title:'Refresh refrigerated mesh calibration',priority:'P3',assignee:'M. Petrovic',sla:'Tomorrow',state:'In progress',next:'Approve calibration window'},
    {id:'OPS-2136',title:'Publish customs batch 776 resolution',priority:'P2',assignee:'E. Kovacevic',sla:'2 h',state:'Resolved',next:'Archive confirmation'},
    {id:'OPS-2128',title:'Approve DC-2 maintenance dock slot',priority:'P3',assignee:'V. Radic',sla:'6 h',state:'Waiting',next:'Await dock supervisor'}
  ].map(task=>({...task,activity:[['14:31','Queue updated by system'],['14:18','Next action confirmed by owner']]}));
  const state={tab:'all',query:'',priority:'',assignee:'',sort:'priority',direction:1,page:1,pageSize:12,selected:new Set(),expanded:null,empty:false};
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const minutes=value=>value==='Tomorrow'?1440:((+(value.match(/(\d+) h/)||[])[1]||0)*60)+(+((value.match(/(\d+) min/)||[])[1]||0));
  const urgent=task=>task.priority==='P1'&&minutes(task.sla)<=18;
  const toast=message=>{const node=$('#queue-toast');node.textContent=message;node.classList.add('show');clearTimeout(window.queueToast);window.queueToast=setTimeout(()=>node.classList.remove('show'),2400)};
  const statusClass=value=>value.toLowerCase().replace(/\s+/g,'-');

  function filtered(){
    const items=tasks.filter(task=>{
      const matches=!state.query||Object.values(task).join(' ').toLowerCase().includes(state.query);
      const tab=state.tab==='all'||state.tab==='mine'&&task.assignee==='M. Petrovic'||state.tab==='attention'&&urgent(task)||state.tab==='waiting'&&task.state==='Waiting';
      return matches&&tab&&(!state.priority||task.priority===state.priority)&&(!state.assignee||task.assignee===state.assignee);
    });
    return items.sort((a,b)=>{
      let x=state.sort==='sla'?minutes(a.sla):a[state.sort],y=state.sort==='sla'?minutes(b.sla):b[state.sort];
      if(state.sort==='priority'){x=+x[1];y=+y[1]}
      return(typeof x==='number'?x-y:String(x).localeCompare(String(y)))*state.direction;
    });
  }
  function row(task){
    const open=state.expanded===task.id;
    return `<tr data-row="${task.id}" class="${open?'expanded':''}"><td><input class="queue-select" type="checkbox" aria-label="Select ${task.id}" ${state.selected.has(task.id)?'checked':''}></td><td><button class="queue-task-link" data-action="inspect">${escape(task.title)}<small>${task.id}</small></button></td><td><span class="queue-tag ${task.priority.toLowerCase()}">${task.priority}</span></td><td><span class="queue-state ${statusClass(task.state)}">${task.state}</span></td><td><span class="queue-assignee">${escape(task.assignee)}</span></td><td><span class="queue-sla ${urgent(task)?'risk':''}">${task.sla}</span></td><td><span class="queue-next" title="${escape(task.next)}">${escape(task.next)}</span></td><td><div class="queue-row-action"><button data-action="expand" aria-label="${open?'Collapse':'Expand'} ${task.id}" aria-expanded="${open}">${open?'⌃':'⌄'}</button></div></td></tr>${open?`<tr class="queue-expand-row"><td colspan="8"><div class="queue-expand-content"><span>Owner<b>${escape(task.assignee)}</b></span><span>Next action<b>${escape(task.next)}</b></span><span>Latest activity<b>${escape(task.activity[0][1])}</b></span></div></td></tr>`:''}`;
  }
  function renderChips(){
    const entries=[];
    if(state.query)entries.push(['query',`Search: ${state.query}`]);
    if(state.priority)entries.push(['priority',`Priority: ${state.priority}`]);
    if(state.assignee)entries.push(['assignee',`Assignee: ${state.assignee}`]);
    if(state.tab!=='all')entries.push(['tab',`View: ${state.tab==='mine'?'My queue':state.tab==='attention'?'Needs attention':'Waiting'}`]);
    $('#queue-chips').innerHTML=entries.map(([key,label])=>`<span class="queue-chip">${escape(label)} <button data-chip="${key}" aria-label="Remove ${escape(label)}">×</button></span>`).join('');
    $$('[data-chip]').forEach(button=>button.onclick=()=>{const key=button.dataset.chip;if(key==='tab')state.tab='all';else if(key==='query'){$('#queue-search').value='';state.query=''}else{$(`#queue-${key}`).value='';state[key]=''}state.page=1;render()});
  }
  function render(){
    const all=state.empty?[]:filtered(),pages=Math.max(1,Math.ceil(all.length/state.pageSize));
    state.page=Math.min(state.page,pages);const visible=all.slice((state.page-1)*state.pageSize,state.page*state.pageSize);
    $('#queue-body').innerHTML=visible.length?visible.map(row).join(''):'<tr><td class="queue-empty" colspan="8"><b>No work items match this queue state.</b>Reset filters or restore the queue to continue.</td></tr>';
    const start=all.length?(state.page-1)*state.pageSize+1:0,end=all.length?start+visible.length-1:0;
    $('#queue-count').textContent=all.length?`Showing ${start}–${end} of ${all.length} work items`:'No matching work items';
    $('#queue-pagination-label').textContent=all.length?`${start}–${end} of ${all.length}`:'0 work items';$('#queue-page').textContent=`${state.page} / ${pages}`;
    $('#queue-prev').disabled=state.page===1;$('#queue-next').disabled=state.page===pages;
    $('#queue-scope').textContent=`${all.length} work items in current queue · refreshed now`;
    $('#queue-view-label').textContent=`View: ${{all:'All work',mine:'My queue',attention:'Needs attention',waiting:'Waiting'}[state.tab]}`;
    $('#queue-urgent').textContent=tasks.filter(urgent).length;$('#queue-unassigned').textContent=tasks.filter(task=>task.assignee==='Unassigned').length;$('#queue-mine').textContent=tasks.filter(task=>task.assignee==='M. Petrovic'&&task.state!=='Resolved').length;
    $('#queue-focus').textContent=tasks.some(urgent)?'Clear P1 cold-chain exception before 15:10.':'No critical SLA breach is pending.';
    $$('[data-tab]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.tab===state.tab)));
    ['all','mine','attention','waiting'].forEach(key=>{$(`#tab-${key}`).textContent=key==='all'?tasks.length:key==='mine'?tasks.filter(task=>task.assignee==='M. Petrovic').length:key==='attention'?tasks.filter(urgent).length:tasks.filter(task=>task.state==='Waiting').length});
    const selected=state.selected.size,$bulk=$('#queue-bulk');$bulk.hidden=!selected;$('#queue-bulk-count').textContent=`${selected} selected`;$('#queue-selected-summary').textContent=selected?`${selected} rows selected`:'No rows selected';
    const ids=visible.map(task=>task.id),allSelected=ids.length&&ids.every(id=>state.selected.has(id));$('#queue-select-all').checked=allSelected;$('#queue-select-all').indeterminate=!allSelected&&ids.some(id=>state.selected.has(id));
    renderChips();$$('.queue-table th button[data-sort]').forEach(button=>button.closest('th').setAttribute('aria-sort',button.dataset.sort===state.sort?(state.direction===1?'ascending':'descending'):'none'));
  }
  function inspector(id){
    const task=tasks.find(item=>item.id===id),panel=$('#queue-inspector');
    $('#queue-inspector-title').textContent=`${task.id} · ${task.title}`;
    $('#queue-inspector-content').innerHTML=`<div class="queue-inspector-status"><span class="queue-tag ${task.priority.toLowerCase()}">${task.priority}</span><span class="queue-state ${statusClass(task.state)}">${task.state}</span></div><dl class="queue-inspector-properties"><dt>Assignee</dt><dd>${escape(task.assignee)}</dd><dt>SLA / due</dt><dd>${task.sla}</dd><dt>Priority</dt><dd>${task.priority}</dd><dt>Latest update</dt><dd>${task.activity[0][0]} · ${escape(task.activity[0][1])}</dd></dl><div class="queue-edit-grid"><label>State<select id="inspector-state">${['New','In progress','Waiting','Resolved'].map(value=>`<option ${value===task.state?'selected':''}>${value}</option>`).join('')}</select></label><label>Assignee<select id="inspector-assignee">${[...new Set(tasks.map(item=>item.assignee))].sort().map(value=>`<option ${value===task.assignee?'selected':''}>${escape(value)}</option>`).join('')}</select></label></div><div class="queue-next-action"><b>Next action</b>${escape(task.next)}</div><div class="queue-inspector-actions"><button class="primary" id="inspector-save">Save changes</button><button id="inspector-complete">Mark complete</button></div><div class="queue-activity"><h3>Activity</h3><ol>${task.activity.map(item=>`<li><time>${item[0]}</time>${escape(item[1])}</li>`).join('')}</ol></div><form class="queue-comment" id="queue-comment"><label for="queue-comment-text">Add operational note</label><textarea id="queue-comment-text" placeholder="Record a handoff, decision or blocker"></textarea><div><button type="submit">Add note</button></div></form>`;
    panel.hidden=false;requestAnimationFrame(()=>panel.classList.add('open'));$('#queue-backdrop').classList.add('show');$('#queue-inspector-close').focus();
    $('#inspector-save').onclick=()=>{task.state=$('#inspector-state').value;task.assignee=$('#inspector-assignee').value;task.activity.unshift(['now','Assignment or workflow state updated']);toast(`${task.id} updated`);render();inspector(id)};
    $('#inspector-complete').onclick=()=>{task.state='Resolved';task.activity.unshift(['now','Work item marked complete']);toast(`${task.id} marked complete`);render();inspector(id)};
    $('#queue-comment').onsubmit=event=>{event.preventDefault();const note=$('#queue-comment-text').value.trim();if(!note)return toast('Add a note before saving');task.activity.unshift(['now',note]);toast('Operational note added');render();inspector(id)};
  }
  function closeInspector(){const panel=$('#queue-inspector');panel.classList.remove('open');$('#queue-backdrop').classList.remove('show');setTimeout(()=>panel.hidden=true,170)}
  [...new Set(tasks.map(task=>task.assignee))].sort().forEach(value=>$('#queue-assignee').insertAdjacentHTML('beforeend',`<option>${escape(value)}</option>`));
  $('#queue-search').oninput=event=>{state.query=event.target.value.trim().toLowerCase();state.page=1;render()};['priority','assignee'].forEach(key=>$(`#queue-${key}`).onchange=event=>{state[key]=event.target.value;state.page=1;render()});
  $$('[data-tab]').forEach(button=>button.onclick=()=>{state.tab=button.dataset.tab;state.page=1;render()});
  $('#queue-reset').onclick=()=>{Object.assign(state,{tab:'all',query:'',priority:'',assignee:'',page:1,empty:false});$('#queue-search').value='';$('#queue-priority').value='';$('#queue-assignee').value='';render()};
  $('#queue-empty').onclick=()=>{state.empty=!state.empty;$('#queue-empty').textContent=state.empty?'Restore queue':'Preview empty state';render()};
  $$('.queue-table th button[data-sort]').forEach(button=>button.onclick=()=>{const sort=button.dataset.sort;if(state.sort===sort)state.direction*=-1;else{state.sort=sort;state.direction=1}render()});
  $('#queue-prev').onclick=()=>{state.page--;render()};$('#queue-next').onclick=()=>{state.page++;render()};
  $('#queue-select-all').onchange=event=>{filtered().slice((state.page-1)*state.pageSize,state.page*state.pageSize).forEach(task=>event.target.checked?state.selected.add(task.id):state.selected.delete(task.id));render()};
  $('#queue-body').onclick=event=>{const tr=event.target.closest('[data-row]');if(!tr)return;const id=tr.dataset.row;if(event.target.matches('.queue-select')){event.target.checked?state.selected.add(id):state.selected.delete(id);render();return}const action=event.target.closest('[data-action]')?.dataset.action;if(action==='inspect')inspector(id);if(action==='expand'){state.expanded=state.expanded===id?null:id;render()}};
  $$('[data-bulk]').forEach(button=>button.onclick=()=>{const action=button.dataset.bulk;if(action==='assign')state.selected.forEach(id=>tasks.find(task=>task.id===id).assignee='M. Petrovic');if(action==='progress')state.selected.forEach(id=>tasks.find(task=>task.id===id).state='In progress');if(action==='clear')state.selected.clear();if(action!=='clear')toast(`${state.selected.size} work items updated`);render()});
  $('#queue-create').onclick=()=>toast('New task form is represented as a local prototype state');$('#app-profile').onclick=()=>toast('Profile menu is represented as a local prototype state');$('#queue-inspector-close').onclick=closeInspector;$('#queue-backdrop').onclick=closeInspector;
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeInspector()});render();
})();
