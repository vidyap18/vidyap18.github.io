// Reports content height to the parent page so the Docusaurus iframe fits exactly (no empty space, nothing cut off).
(function(){
  function send(){parent.postMessage({type:"demo-height",height:Math.ceil(document.documentElement.getBoundingClientRect().height)},"*");}
  if(window.ResizeObserver)new ResizeObserver(send).observe(document.documentElement);
  window.addEventListener("load",send);setTimeout(send,300);
})();
window.ICON={
  lock:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9A9AA6" stroke-width="1.8" stroke-linecap="round"><path d="M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11"/></svg>',
  people:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B5BD6" stroke-width="1.6" stroke-linecap="round"><path d="M5.8 8a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0M3.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5M14.2 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M15.6 14.2c2.4.2 4.2 1.8 4.8 4.8"/></svg>',
  layers:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#55555F" stroke-width="1.7" stroke-linejoin="round"><path d="M12 4l8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4"/></svg>'
};
window.seg=function(el,labels,cur,onPick){el.innerHTML=labels.map(function(l,i){return '<button aria-pressed="'+(i===cur)+'" data-i="'+i+'">'+l+'</button>';}).join("");el.onclick=function(e){var b=e.target.closest("button");if(b)onPick(+b.dataset.i);};};
