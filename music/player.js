/* UWELL — фонова музика: одна кнопка, треки грають далі при переході між сторінками */
(()=>{
if(window.__uwp)return;window.__uwp=1;
const T=[{"a": "BARI IVAN", "t": "VP", "f": "01-bari-ivan-vp.mp3"}, {"a": "BOILOOK", "t": "Welcome to Ukraine", "f": "02-boilook-welcome-to-ukraine.mp3"}, {"a": "BOILOOK", "t": "KRAKEN", "f": "03-boilook-kraken.mp3"}, {"a": "BOILOOK ft. TONY TONITE", "t": "Let the Luv Save Tha World", "f": "04-boilook-ft-tony-tonite-let-the-luv-save-tha-world.mp3"}, {"a": "BOILOOK", "t": "The Last Way", "f": "05-boilook-the-last-way.mp3"}, {"a": "BOILOOK", "t": "The Moments", "f": "06-boilook-the-moments.mp3"}, {"a": "NACL", "t": "Instrumental 3", "f": "07-nacl-instrumental-3.mp3"}, {"a": "PROTEST", "t": "День і ніч", "f": "08-protest-den-i-nich.mp3"}, {"a": "RAZO", "t": "Талія", "f": "09-razo-taliya.mp3"}, {"a": "RAZO x BOILOOK", "t": "Russian Fag", "f": "10-razo-x-boilook-russian-fag.mp3"}, {"a": "ONEWITCH", "t": "ZVUK", "f": "11-onewitch-zvuk.mp3"}, {"a": "RAZO", "t": "Лютий вітер", "f": "12-razo-lyutyy-viter.mp3"}, {"a": "RAZO", "t": "Очі в очі", "f": "13-razo-ochi-v-ochi.mp3"}, {"a": "RAZO x WZ Beats", "t": "Без назви", "f": "14-razo-x-wz-beats-bez-nazvy.mp3"}];
const base=new URL('.',document.currentScript.src).href;
const ss={get(k){try{return JSON.parse(sessionStorage.getItem('uwp_'+k))}catch(e){return null}},set(k,v){try{sessionStorage.setItem('uwp_'+k,JSON.stringify(v))}catch(e){}}};
let order=ss.get('order');
if(!Array.isArray(order)||order.length!==T.length){order=[...T.keys()];for(let a=order.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[order[a],order[b]]=[order[b],order[a]]}ss.set('order',order)}
let pos=+ss.get('pos')||0;if(pos>=order.length)pos=0;
const css=`#uwpbox{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:calc(max(18px,env(safe-area-inset-bottom)) + 4px);z-index:70;display:flex;align-items:center;gap:6px;padding:5px;border-radius:999px;background:rgba(18,18,20,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 14px 40px -12px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.12);font:800 15px Manrope,system-ui,sans-serif}
#uwpbox button{border:0;cursor:pointer;color:#fff;font:inherit;display:flex;align-items:center;justify-content:center;transition:background .2s}
#uwpbox button:focus-visible{outline:2px solid #fff;outline-offset:3px}
#uwpbox svg{width:22px;height:22px;fill:currentColor;flex:none}
.uwp-sk{width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.08)}.uwp-sk:hover{background:rgba(255,255,255,.18)}.uwp-sk svg{width:18px;height:18px}
#uwp{position:relative;height:50px;padding:0 20px 0 16px;border-radius:999px;gap:10px;background:#e30613}
#uwp:hover{background:#ff2a36}
#uwp .tx{max-width:min(170px,34vw);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#uwp .eq{display:none;gap:3px;height:18px;width:22px;flex:none;justify-content:center;align-items:flex-end}#uwp .eq i{width:4px;border-radius:2px;background:#fff;animation:uwpq .9s ease-in-out infinite}
#uwp .eq i:nth-child(2){animation-delay:-.3s}#uwp .eq i:nth-child(3){animation-delay:-.6s}
#uwp.on .eq{display:flex}#uwp.on svg{display:none}
@keyframes uwpq{0%,100%{height:30%}50%{height:100%}}
@media (max-width:420px){#uwpbox{gap:4px;padding:4px}.uwp-sk{width:42px;height:42px}#uwp{padding:0 16px 0 14px}}
@media (prefers-reduced-motion:reduce){#uwp .eq i{animation:none;height:70%}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const box=document.createElement('div');box.id='uwpbox';box.setAttribute('role','group');box.setAttribute('aria-label','Музика UWELL');
box.innerHTML='<button type="button" class="uwp-sk" id="uwp-prev" aria-label="Попередній трек" title="Попередній трек"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2.5v14H6zM20 5v14L9.5 12z"/></svg></button><button type="button" id="uwp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="tx">Музика</span></button><button type="button" class="uwp-sk" id="uwp-next" aria-label="Наступний трек" title="Наступний трек"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5H18v14h-2.5zM4 5v14l10.5-7z"/></svg></button>';
const btn=box.querySelector('#uwp'),tx=box.querySelector('.tx');
const au=new Audio();au.preload='none';
const cur=()=>T[order[pos]];
const label=()=>{const t=cur(),p=!au.paused;btn.classList.toggle('on',p);if(p||au.currentTime>0)tx.textContent=t.t;const s=(p?'Пауза: ':'Слухати музику UWELL: ')+t.a+' — '+t.t;btn.setAttribute('aria-label',s);btn.title=s};
const set=(go,time)=>{const t=cur();au.src=base+t.f;if(time)au.addEventListener('loadedmetadata',()=>{try{au.currentTime=time}catch(e){}},{once:true});
 if('mediaSession' in navigator){try{navigator.mediaSession.metadata=new MediaMetadata({title:t.t,artist:t.a,album:'UWELL',artwork:[{src:base+'../uwell-prod-logo.png',sizes:'512x512',type:'image/png'}]})}catch(e){}}
 ss.set('pos',pos);if(go)au.play().catch(()=>{});label()};
const next=d=>{pos=(pos+d+order.length)%order.length;set(true)};
btn.onclick=()=>{if(au.paused){au.play().catch(()=>{})}else au.pause()};
box.querySelector('#uwp-next').onclick=()=>next(1);
box.querySelector('#uwp-prev').onclick=()=>{if(au.currentTime>3){au.currentTime=0;if(au.paused)au.play().catch(()=>{})}else next(-1)};
au.onplay=()=>{ss.set('on',true);label()};au.onpause=()=>{if(!au.ended)ss.set('on',false);label()};
au.onended=()=>next(1);au.onerror=()=>{if(au.src)setTimeout(()=>next(1),400)};
setInterval(()=>{if(!au.paused)ss.set('t',au.currentTime)},1500);
addEventListener('pagehide',()=>ss.set('t',au.currentTime));
if('mediaSession' in navigator){try{navigator.mediaSession.setActionHandler('nexttrack',()=>next(1));navigator.mediaSession.setActionHandler('previoustrack',()=>next(-1));navigator.mediaSession.setActionHandler('play',()=>au.play());navigator.mediaSession.setActionHandler('pause',()=>au.pause())}catch(e){}}
document.body.appendChild(box);
/* продовжити після повного перезавантаження сторінки */
const was=ss.get('on');set(false,+ss.get('t')||0);
if(was){au.play().catch(()=>{const go=()=>{au.play().catch(()=>{});removeEventListener('pointerdown',go,true);removeEventListener('keydown',go,true)};addEventListener('pointerdown',go,true);addEventListener('keydown',go,true)})}
/* перехід між сторінками сайту без перезавантаження, щоб музика не переривалась */
const same=u=>u.origin===location.origin&&!/\.(png|jpe?g|webp|mp3|pdf|zip)$/i.test(u.pathname);
const swap=async(url,push)=>{
 const r=await fetch(url,{credentials:'same-origin'});if(!r.ok)throw 0;
 const doc=new DOMParser().parseFromString(await r.text(),'text/html');
 if(!doc.querySelector('main')||!document.querySelector('main')||doc.querySelectorAll('head style').length)throw 0;
 document.title=doc.title;
 for(const n of [...document.body.childNodes])if(n!==box)n.remove();
 document.body.className=doc.body.className;
 const scripts=[];
 for(const n of [...doc.body.childNodes]){if(n.nodeName==='SCRIPT'){scripts.push(n);continue}document.body.insertBefore(document.importNode(n,true),box)}
 for(const sel of ['meta[name=description]','meta[property="og:title"]','link[rel=canonical]']){const a=document.head.querySelector(sel),b=doc.head.querySelector(sel);if(a&&b)a.replaceWith(document.importNode(b,true))}
 if(push)history.pushState({uwp:1},'',url);
 for(const s of scripts){if(s.src&&/music\/player\.js/.test(s.src))continue;const e=document.createElement('script');for(const a of s.attributes)e.setAttribute(a.name,a.value);e.textContent=s.textContent;document.body.insertBefore(e,box)}
 const h=new URL(url).hash;const el=h&&document.getElementById(decodeURIComponent(h.slice(1)));
 if(el)el.scrollIntoView();else scrollTo(0,0)};
document.addEventListener('click',e=>{
 if(au.paused||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download'))return;
 const u=new URL(a.href,location.href);if(!same(u))return;
 if(u.pathname===location.pathname&&u.hash)return;
 e.preventDefault();swap(u.href,true).catch(()=>{location.href=u.href})});
addEventListener('popstate',()=>{if(history.state&&history.state.uwp||!au.paused)swap(location.href,false).catch(()=>location.reload())});
history.replaceState(Object.assign({},history.state,{uwp:1}),'');
})();
