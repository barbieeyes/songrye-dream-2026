(function(){
var S=[].slice.call(document.querySelectorAll('#stage>section')),i=0,st=document.getElementById('stage');
function fit(){var d=document.documentElement,vv=window.visualViewport;
var W=Math.min(innerWidth,d.clientWidth||innerWidth,vv?vv.width*(vv.scale||1):innerWidth),H=Math.min(innerHeight,d.clientHeight||innerHeight,vv?vv.height*(vv.scale||1):innerHeight);
var k=Math.min(W/1920,H/1080)*0.995;st.style.left=(W-1920*k)/2+'px';st.style.top=(H-1080*k)/2+'px';st.style.transformOrigin='0 0';st.style.transform='scale('+k+')';}
var v=document.getElementById('jv'),pb=document.getElementById('pb');
function show(n){if(n<0||n>=S.length)return;document.getElementById('prev').disabled=n===0;document.getElementById('next').disabled=n===S.length-1;if(v&&!v.paused)v.pause();S[i].classList.remove('on');i=n;S[i].classList.add('on');document.getElementById('pg').textContent=(i+1)+' / '+S.length;try{history.replaceState(null,'','#'+(i+1))}catch(e){}}
function toggle(){if(!v)return;if(v.paused){v.muted=false;v.volume=1;v.play()}else{v.pause()}}
var vp=document.getElementById('vp'),vs=document.getElementById('vs'),vt=document.getElementById('vt'),vd=document.getElementById('vd'),vbar=document.getElementById('vbar'),drag=false;
function fmt(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
if(v){v.addEventListener('play',function(){vp.textContent='❚❚';pb.classList.add('hide');vbar.classList.remove('show')});
v.addEventListener('pause',function(){vp.textContent='▶';vbar.classList.add('show');if(v.currentTime<0.1)pb.classList.remove('hide')});
v.addEventListener('loadedmetadata',function(){vd.textContent=fmt(v.duration)});
v.addEventListener('timeupdate',function(){vt.textContent=fmt(v.currentTime);if(!drag&&v.duration)vs.value=Math.round(v.currentTime/v.duration*1000)});
vs.addEventListener('input',function(){drag=true;if(v.duration){v.currentTime=vs.value/1000*v.duration;vt.textContent=fmt(v.currentTime)}});
vs.addEventListener('change',function(){drag=false});
vp.onclick=function(e){e.stopPropagation();toggle()};
document.getElementById('vr').onclick=function(e){e.stopPropagation();v.currentTime=0;v.play()};
vbar.addEventListener('click',function(e){e.stopPropagation()});vbar.classList.add('show')}
if(v){pb.onclick=function(e){e.stopPropagation();toggle()};v.onclick=function(e){e.stopPropagation();toggle()};v.onended=function(){vbar.classList.add('show')}}
document.getElementById('prev').onclick=function(e){e.stopPropagation();show(i-1)};
document.getElementById('next').onclick=function(e){e.stopPropagation();show(i+1)};
document.getElementById('fs').onclick=function(e){e.stopPropagation();if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
var cp=document.getElementById('cp');if(cp)cp.onclick=function(e){e.stopPropagation();try{navigator.clipboard.writeText('SOR-2026-RP67');cp.textContent='복사됨!'}catch(x){}};
st.addEventListener('click',function(e){if(e.target.closest('a,button,video,input,.vbar'))return;show(i+1)});
addEventListener('keydown',function(e){var k=e.key;
 if(k==='ArrowRight'||k==='PageDown'||k===' '&&!(S[i].id==='journey')){e.preventDefault();show(i+1)}
 else if(S[i].id==='journey'&&v&&(k==='j'||k==='l')){v.currentTime+=k==='l'?5:-5}
 else if(k==='ArrowLeft'||k==='PageUp'){e.preventDefault();show(i-1)}
 else if(k===' '&&S[i].id==='journey'){e.preventDefault();toggle()}
 else if(k==='f'||k==='F'){document.getElementById('fs').click()}
 else if(k==='Home')show(0);else if(k==='End')show(S.length-1)});
addEventListener('resize',fit);addEventListener('orientationchange',function(){setTimeout(fit,300)});if(window.visualViewport)visualViewport.addEventListener('resize',fit);addEventListener('load',fit);document.addEventListener('fullscreenchange',function(){setTimeout(fit,200)});fit();setTimeout(fit,500);
function fromHash(){var h=parseInt(location.hash.slice(1));if(h>0&&h<=S.length&&h-1!==i)show(h-1)}var h0=parseInt(location.hash.slice(1));S[0].classList.add("on");show(h0>0&&h0<=S.length?h0-1:0);addEventListener("hashchange",fromHash);
})();
