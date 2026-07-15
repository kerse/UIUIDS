(function(){
  'use strict';

  const pageByFile={
    'overview.html':'overview','experimental-realtime.html':'realtime','monitoring.html':'monitoring',
    'data-explorer.html':'data','entity-detail.html':'entity','analytics.html':'analytics',
    'alerts.html':'alerts','operations.html':'operations','audit-log.html':'audit',
    'settings.html':'settings','components.html':'components'
  };
  const shellIds={nav:'app-sidebar',toggle:'app-nav-toggle',profile:'app-profile'};
  const themeStorageKey='uitheme';
  const groups=[
    ['Monitor',[
      ['overview','Executive overview','overview.html','home'],
      ['realtime','Realtime dashboard','experimental-realtime.html','pulse'],
      ['monitoring','Monitoring','monitoring.html','activity'],
      ['analytics','Analytics','analytics.html','chart']
    ]],
    ['Work',[
      ['data','Data explorer','data-explorer.html','table'],
      ['entity','Entity detail','entity-detail.html','asset'],
      ['alerts','Alerts','alerts.html','alert'],
      ['operations','Operations queue','operations.html','check'],
      ['audit','Audit log','audit-log.html','history']
    ]],
    ['System',[
      ['settings','Settings','settings.html','settings'],
      ['components','Components','components.html','grid']
    ]]
  ];
  const paths={
    home:'M3 9.5 8 5l5 4.5v5H9.8v-3.5H6.2v3.5H3z',pulse:'M1.5 9h3l1.7-4 3.1 8 2-5H15',
    activity:'M2 12V8m4 4V4m4 8V7m4 5V2',chart:'M2 14V8m4 6V5m4 9m4 5V3',
    table:'M2 3h12v10H2zM2 7h12M6 3v10',asset:'M3 4h10v9H3zM6 4V2h4v2M6 8h4',
    alert:'M8 2 15 14H1zM8 6v3m0 2.5v.5',check:'M2 8.5 6 12l8-9M9 12h5',
    history:'M8 2a6 6 0 1 1-5.2 3M2 2v4h4M8 5v4l3 2',
    settings:'M8 5.3A2.7 2.7 0 1 0 8 10.7 2.7 2.7 0 0 0 8 5.3zM8 1v2m0 10v2M1 8h2m10 0h2M3 3l1.5 1.5m7 7L13 13M13 3l-1.5 1.5m-7 7L3 13',
    grid:'M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z'
  };

  function currentPage(){return pageByFile[location.pathname.split('/').pop()]||document.documentElement.dataset.workspacePage||'overview';}
  function icon(name){return `<span class="ui-nav-icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="${paths[name]}"></path></svg></span>`;}
  function initialTheme(){
    const saved=localStorage.getItem(themeStorageKey);
    if(saved==='light'||saved==='dark')return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  }
  function applyTheme(theme,{persist=true}={}){
    const next=theme==='dark'?'dark':'light';
    document.documentElement.dataset.theme=next;
    if(persist)localStorage.setItem(themeStorageKey,next);
    document.querySelectorAll('[data-theme-toggle]').forEach(button=>{
      const dark=next==='dark';
      button.setAttribute('aria-pressed',String(dark));
      button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
      button.title=dark?'Light theme':'Dark theme';
      const label=button.querySelector('[data-theme-label]');
      const glyph=button.querySelector('[data-theme-icon]');
      if(label)label.textContent=dark?'Light theme':'Dark theme';
      if(glyph)glyph.textContent=dark?'☀':'◐';
    });
    document.dispatchEvent(new CustomEvent('ops:themechange',{detail:{theme:next}}));
  }
  function bindGlobalTheme(){
    if(document.documentElement.dataset.opsThemeBound)return;
    document.documentElement.dataset.opsThemeBound='true';
    document.addEventListener('click',event=>{
      const button=event.target.closest('[data-theme-toggle]');
      if(!button)return;
      event.preventDefault();
      applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
    });
  }
  function sidebarMarkup(page){
    const ids=shellIds;
    return `<aside class="ui-sidebar" id="${ids.nav}" aria-label="Primary navigation"><a class="ui-brand" href="../index.html"><span class="ui-brand-mark">UI</span><span class="ui-brand-copy">UIUIDS<small>Control plane</small></span></a>${groups.map(([label,items])=>`<section class="ui-nav-section"><div class="ui-nav-label">${label}</div><nav class="ui-nav-list">${items.map(([key,text,href,glyph])=>`<a class="ui-nav-link" href="${href}" ${key===page?'aria-current="page"':''}>${icon(glyph)}<span>${text}</span></a>`).join('')}</nav></section>`).join('')}<button class="ui-theme-toggle" type="button" data-theme-toggle aria-pressed="false"><span class="ui-theme-icon" data-theme-icon aria-hidden="true">◐</span><span data-theme-label>Dark theme</span></button><div class="ui-profile"><span class="ui-avatar">MP</span><span class="ui-profile-copy"><b>M. Petrovic</b><small>Operations lead</small></span><button type="button" id="${ids.profile}" aria-label="Open profile menu">⌄</button></div></aside>`;
  }
  function headerMarkup(page,title,subtitle,actions){
    const ids=shellIds;
    return `<header class="ui-page-header"><div class="ui-title-row"><button type="button" class="ui-mobile-menu" id="${ids.toggle}" aria-controls="${ids.nav}" aria-expanded="false">☰<span class="sr-only">Open navigation</span></button><div class="ui-page-heading"><div class="ui-eyebrow">UIUIDS</div><h1 class="ui-page-title">${title}</h1><p class="ui-page-subtitle">${subtitle||''}</p></div></div><div class="ui-header-actions">${actions||''}</div></header>`;
  }
  function shellMarkup(page,title,subtitle,actions,content){return `<div class="ui-shell">${sidebarMarkup(page)}<main class="ui-main">${headerMarkup(page,title,subtitle,actions)}${content||''}</main></div>`;}

  function applyDensity(compact){
    document.documentElement.dataset.density=compact?'compact':'comfortable';
    document.body.dataset.density=compact?'compact':'comfortable';
    localStorage.oidensity=compact?'compact':'';
    document.querySelectorAll('button[data-density],#exec-density,#explorer-density,#queue-density').forEach(button=>{
      button.textContent=compact?'Comfortable':'Compact';
      button.setAttribute('aria-pressed',String(compact));
    });
  }
  function bindGlobalDensity(){
    if(document.documentElement.dataset.opsDensityBound)return;
    document.documentElement.dataset.opsDensityBound='true';
    document.addEventListener('click',event=>{
      const button=event.target.closest('button[data-density],#exec-density,#explorer-density,#queue-density');
      if(!button)return;
      event.preventDefault();event.stopImmediatePropagation();
      applyDensity(document.documentElement.dataset.density!=='compact');
    },true);
  }
  function removeLegacyDensityHandlers(){
    document.querySelectorAll('#exec-density,#explorer-density,#queue-density').forEach(button=>{
      const clean=button.cloneNode(true);
      button.replaceWith(clean);
    });
  }
  function bindShell(scope,page){
    const ids=shellIds;
    const sidebar=scope.querySelector('.ui-sidebar');
    const toggle=scope.querySelector('.ui-mobile-menu');
    toggle?.addEventListener('click',()=>{
      const open=sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&sidebar.classList.contains('open')){
        sidebar.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();
      }
    });
    scope.querySelector(`#${ids.profile}`)?.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('ops:profile')));
    bindGlobalDensity();applyDensity(localStorage.oidensity==='compact');applyTheme(document.documentElement.dataset.theme,{persist:false});
  }
  function mount(root,{page=currentPage(),title,subtitle='',actions='',content=''}){
    root.innerHTML=shellMarkup(page,title,subtitle,actions,content)+`<div class="ws-toast" role="status" aria-live="polite"></div>`;
    bindShell(root,page);
  }

  class OpsShellElement extends HTMLElement{
    connectedCallback(){
      if(this.dataset.mounted)return;
      this.dataset.mounted='true';
      const page=this.getAttribute('page')||currentPage();
      const title=this.getAttribute('title')||document.title;
      const subtitleNode=this.querySelector('[slot="subtitle"]');
      const actionsNode=this.querySelector('[slot="actions"]');
      const content=[...this.children].filter(node=>node!==subtitleNode&&node!==actionsNode);
      const shell=document.createElement('div');shell.className='ui-shell';shell.innerHTML=sidebarMarkup(page);
      const main=document.createElement('main');main.className='ui-main';
      const header=document.createElement('header');header.className='ui-page-header';
      const ids=shellIds;
      const titleRow=document.createElement('div');titleRow.className='ui-title-row';
      titleRow.innerHTML=`<button type="button" class="ui-mobile-menu" id="${ids.toggle}" aria-controls="${ids.nav}" aria-expanded="false">☰<span class="sr-only">Open navigation</span></button><div class="ui-page-heading"><div class="ui-eyebrow">UIUIDS</div><h1 class="ui-page-title">${title}</h1></div>`;
      const heading=titleRow.querySelector('.ui-page-heading');
      if(subtitleNode){subtitleNode.removeAttribute('slot');subtitleNode.className='ui-page-subtitle';heading.append(subtitleNode);}
      if(actionsNode){actionsNode.removeAttribute('slot');actionsNode.className='ui-header-actions';}
      header.append(titleRow,actionsNode||document.createElement('div'));
      main.append(header,...content);shell.append(main);this.replaceChildren(shell);bindShell(this,page);
    }
  }

  applyTheme(initialTheme(),{persist:false});
  bindGlobalTheme();
  window.OpsShell={mount,shellMarkup,applyDensity,applyTheme};
  if(!customElements.get('ops-shell'))customElements.define('ops-shell',OpsShellElement);
  document.addEventListener('DOMContentLoaded',removeLegacyDensityHandlers,{once:true});
})();
