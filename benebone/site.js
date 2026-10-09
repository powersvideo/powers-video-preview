
// Keep each film's sound independent.
document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
 document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
}));
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[...document.querySelectorAll('.concept,.partnership,.documents,.bio')];
const cue=document.querySelector('.scroll-cue');
const clamp=n=>Math.max(0,Math.min(1,n));
let scheduled=false;
function updateScenes(){
 scheduled=false;
 const height=window.innerHeight;
 document.documentElement.classList.toggle('motion-ready',!reduceMotion.matches);
 for(const scene of scenes){
  scene.classList.add('scroll-scene');
  const box=scene.getBoundingClientRect();
  const visibility=Math.min(clamp((height-box.top)/(height*.45)),clamp(box.bottom/(height*.35)));
  scene.style.setProperty('--scene-visibility',reduceMotion.matches?1:visibility.toFixed(3));
 }
 cue.hidden=window.scrollY+height>=document.documentElement.scrollHeight-90;
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(updateScenes);}}
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule);
reduceMotion.addEventListener('change',schedule);
cue.addEventListener('click',()=>{
 const next=scenes.find(scene=>scene.getBoundingClientRect().top>110);
 if(next)next.scrollIntoView({behavior:reduceMotion.matches?'instant':'smooth',block:'start'});
});
updateScenes();
