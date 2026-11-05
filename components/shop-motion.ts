'use client';
import {useEffect,type RefObject} from 'react';
const easing='cubic-bezier(.16,1,.3,1)';
export function useShopMotion(root:RefObject<HTMLElement|null>,revision:string){
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');const animations:Animation[]=[];
  if(!preference.matches)host.querySelectorAll('.hero-copy h1,.hero-copy>p,.hero-copy>.button,.hero-foot').forEach((el,i)=>animations.push(el.animate([{opacity:.25,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*75,easing})));
  const stop=()=>animations.forEach(a=>a.cancel());preference.addEventListener('change',stop);return()=>{stop();preference.removeEventListener('change',stop);};
 },[root]);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');if(preference.matches)return;
  const animations:Animation[]=[];
  const observer=new IntersectionObserver(entries=>{
   entries.filter(e=>e.isIntersecting).forEach((entry,i)=>{const el=entry.target as HTMLElement;observer.unobserve(el);if(el.dataset.motionSeen)return;el.dataset.motionSeen='true';const story=el.matches('.story-image');animations.push(el.animate(story?[{clipPath:'inset(0 8% 0 0)'},{clipPath:'inset(0 0 0 0)'}]:[{opacity:.3,transform:`translateY(${el.matches('.product-card')?14:24}px)`},{opacity:1,transform:'translateY(0)'}],{duration:story?750:450,delay:Math.min(i*35,175),easing}));});
  },{threshold:.12});
  host.querySelectorAll('.product-card,.lookbook-grid>button,.story-image,.story-copy h2,.category-feature>button').forEach(el=>observer.observe(el));
  const stop=()=>{observer.disconnect();animations.forEach(a=>a.cancel());};preference.addEventListener('change',stop);return()=>{stop();preference.removeEventListener('change',stop);};
 },[root,revision]);
}
