/* UWELL — фонова музика: одна кнопка, треки грають далі при переході між сторінками */
(()=>{
if(window.__uwp)return;window.__uwp=1;
const T=[{"a": "BARI IVAN", "t": "VP", "f": "01-bari-ivan-vp.mp3"}, {"a": "BOILOOK", "t": "Welcome to Ukraine", "f": "02-boilook-welcome-to-ukraine.mp3"}, {"a": "BOILOOK", "t": "KRAKEN", "f": "03-boilook-kraken.mp3"}, {"a": "BOILOOK ft. TONY TONITE", "t": "Let the Luv Save Tha World", "f": "04-boilook-ft-tony-tonite-let-the-luv-save-tha-world.mp3"}, {"a": "BOILOOK", "t": "The Last Way", "f": "05-boilook-the-last-way.mp3"}, {"a": "BOILOOK", "t": "The Moments", "f": "06-boilook-the-moments.mp3"}, {"a": "NACL", "t": "Instrumental 3", "f": "07-nacl-instrumental-3.mp3"}, {"a": "PROTEST", "t": "День і ніч", "f": "08-protest-den-i-nich.mp3"}, {"a": "RAZO", "t": "Талія", "f": "09-razo-taliya.mp3"}, {"a": "RAZO x BOILOOK", "t": "Russian Fag", "f": "10-razo-x-boilook-russian-fag.mp3"}, {"a": "ONEWITCH", "t": "ZVUK", "f": "11-onewitch-zvuk.mp3"}, {"a": "RAZO", "t": "Лютий вітер", "f": "12-razo-lyutyy-viter.mp3"}, {"a": "RAZO", "t": "Очі в очі", "f": "13-razo-ochi-v-ochi.mp3"}, {"a": "RAZO x WZ Beats", "t": "Без назви", "f": "14-razo-x-wz-beats-bez-nazvy.mp3"}];
const base=new URL('.',document.currentScript.src).href;
const ss={get(k){try{return JSON.parse(sessionStorage.getItem('uwp_'+k))}catch(e){return null}},set(k,v){try{sessionStorage.setItem('uwp_'+k,JSON.stringify(v))}catch(e){}}};
let order=ss.get('order');
if(!Array.isArray(order)||order.length!==T.length){order=[...T.keys()];for(let a=order.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[order[a],order[b]]=[order[b],order[a]]}ss.set('order',order)}
let pos=+ss.get('pos')||0;if(pos>=order.length)pos=0;
const css=`#uwp{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:calc(max(18px,env(safe-area-inset-bottom)) + 4px);z-index:70;height:56px;padding:0 22px 0 18px;border-radius:999px;border:0;cursor:pointer;display:flex;align-items:center;gap:10px;font:800 15px Manrope,system-ui,sans-serif;color:#fff;background:#e30613;box-shadow:0 14px 40px -10px rgba(227,6,19,.8),0 0 0 1px rgba(255,255,255,.14);transition:transform .2s,background .2s}
#uwp:hover{background:#ff2a36;transform:scale(1.04)}#uwp:focus-visible{outline:2px solid #fff;outline-offset:4px}
#uwp svg{width:24px;height:24px;fill:currentColor}
#uwp .eq{display:none;gap:3px;height:18px;width:18px;justify-content:center;align-items:flex-end}#uwp .eq i{width:4px;border-radius:2px;background:#fff;animation:uwpq .9s ease-in-out infinite}
#uwp .eq i:nth-child(2){animation-delay:-.3s}#uwp .eq i:nth-child(3){animation-delay:-.6s}
#uwp.on .eq{display:flex}#uwp.on svg{display:none}
#uwp.on::after{content:"";position:absolute;inset:-6px;border-radius:999px;border:2px solid rgba(227,6,19,.6);animation:uwpr 2s ease-out infinite}
@keyframes uwpq{0%,100%{height:30%}50%{height:100%}}@keyframes uwpr{from{transform:scale(.95);opacity:1}to{transform:scale(1.15,1.4);opacity:0}}
@media (prefers-reduced-motion:reduce){#uwp .eq i,#uwp.on::after{animation:none}#uwp .eq i{height:70%}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const btn=document.createElement('button');btn.id='uwp';btn.type='button';
btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span><span>Музика</span>';
const au=new Audio();au.preload='none';
const cur=()=>T[order[pos]];
const label=()=>{const t=cur(),p=!au.paused;btn.classList.toggle('on',p);const s=(p?'Пауза: ':'Слухати музику UWELL: ')+t.a+' — '+t.t;btn.setAttribute('aria-label',s);btn.title=s};
const set=(go,time)=>{const t=cur();au.src=base+t.f;if(time)au.addEventListener('loadedmetadata',()=>{try{au.currentTime=time}catch(e){}},{once:true});
 if('mediaSession' in navigator){try{navigator.mediaSession.metadata=new MediaMetadata({title:t.t,artist:t.a,album:'UWELL',artwork:[{src:base+'../uwell-prod-logo.png',sizes:'512x512',type:'image/png'}]})}catch(e){}}
 ss.set('pos',pos);if(go)au.play().catch(()=>{});label()};
const next=d=>{pos=(pos+d+order.length)%order.length;set(true)};
btn.onclick=()=>{if(au.paused){au.play().catch(()=>{})}else au.pause()};
au.onplay=()=>{ss.set('on',true);label()};au.onpause=()=>{if(!au.ended)ss.set('on',false);label()};
au.onended=()=>next(1);au.onerror=()=>{if(au.src)setTimeout(()=>next(1),400)};
setInterval(()=>{if(!au.paused)ss.set('t',au.currentTime)},1500);
addEventListener('pagehide',()=>ss.set('t',au.currentTime));
if('mediaSession' in navigator){try{navigator.mediaSession.setActionHandler('nexttrack',()=>next(1));navigator.mediaSession.setActionHandler('previoustrack',()=>next(-1));navigator.mediaSession.setActionHandler('play',()=>au.play());navigator.mediaSession.setActionHandler('pause',()=>au.pause())}catch(e){}}
document.body.appendChild(btn);
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
 for(const n of [...document.body.childNodes])if(n!==btn)n.remove();
 document.body.className=doc.body.className;
 const scripts=[];
 for(const n of [...doc.body.childNodes]){if(n.nodeName==='SCRIPT'){scripts.push(n);continue}document.body.insertBefore(document.importNode(n,true),btn)}
 for(const sel of ['meta[name=description]','meta[property="og:title"]','link[rel=canonical]']){const a=document.head.querySelector(sel),b=doc.head.querySelector(sel);if(a&&b)a.replaceWith(document.importNode(b,true))}
 if(push)history.pushState({uwp:1},'',url);
 for(const s of scripts){if(s.src&&/music\/player\.js/.test(s.src))continue;const e=document.createElement('script');for(const a of s.attributes)e.setAttribute(a.name,a.value);e.textContent=s.textContent;document.body.insertBefore(e,btn)}
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
