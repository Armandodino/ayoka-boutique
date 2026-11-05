import {phoneKey,type Contact} from './crm';
import {seedProducts} from './seed';
import {defaultSettings,type Product,type Settings} from './types';
export const demo=import.meta.env.VITE_DEMO==='true';
type State={products:Product[];settings:Settings;orders:any[];contacts:Contact[];catalogRevisions?:string[]};
const poloRevision='polos-2026-10-03';
function read():State {
 let state:State;
 try {
  const saved=localStorage.getItem('ayoka-demo-v1');
  if(!saved)throw new Error('Empty');
  const data=JSON.parse(saved);
  if(!Array.isArray(data.products)||!data.settings)throw new Error('Invalid');
  state={...data,contacts:data.contacts||[],orders:data.orders||[]};
 }catch{return {products:structuredClone(seedProducts),settings:{...defaultSettings},orders:[],contacts:[],catalogRevisions:[poloRevision]};}
 let changed=false;
 if(state.settings.headline==='ABIDJAN. DANS LA PEAU.'){state.settings.headline=defaultSettings.headline;state.settings.intro=defaultSettings.intro;changed=true;}
 if(!state.catalogRevisions?.includes(poloRevision)){
  const ids=new Set(state.products.map(p=>p.id));
  let position=Math.max(-1,...state.products.map(p=>p.position));
  seedProducts.filter(p=>p.category==='Polos'&&!ids.has(p.id)).forEach(p=>state.products.push({...structuredClone(p),position:++position}));
  state.catalogRevisions=[...(state.catalogRevisions||[]),poloRevision];changed=true;
 }
 if(changed){try{localStorage.setItem('ayoka-demo-v1',JSON.stringify(state));}catch{/* Keep edits readable even if browser storage is full. */}}
 return state;
}
export async function api(path:string,body?:any){
 if(!demo){const res=await fetch(path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});const data:any=await res.json();if(!res.ok)throw new Error(data.error||'La demande n’a pas abouti.');return data;}
 const state=read();
 if(!body)return path==='/api/catalog'?{products:state.products.filter(p=>p.active).sort((a,b)=>a.position-b.position),settings:state.settings}:state;
 if(body.action==='contact'){const {contactSchema}=await import('./crm-schema');const c=contactSchema.parse(body.contact);if(state.contacts.some(other=>other.id!==c.id&&((c.phone&&phoneKey(other.phone)===phoneKey(c.phone))||(c.email&&other.email.toLowerCase()===c.email.toLowerCase()))))throw new Error('Ce contact existe déjà.');const i=state.contacts.findIndex(x=>x.id===c.id);if(i<0)state.contacts.push(c);else state.contacts[i]=c;}
 else if(body.action==='product'){const i=state.products.findIndex(p=>p.id===body.product.id);if(i<0)state.products.push(body.product);else state.products[i]=body.product;}
 else if(body.action==='settings'){if(body.settings.ordersEnabled&&body.settings.deliveryFee===null)throw new Error('Renseigne les frais de livraison.');state.settings=body.settings;}
 else if(body.action==='reorder')state.products.forEach(p=>p.position=body.ids.indexOf(p.id));
 else if(body.action==='order'){const o=state.orders.find(o=>o.id===body.id);if(o)o.status=body.status;}
 else if(path==='/api/orders')throw new Error('Version d’essai : aucune vraie commande n’est envoyée.');
 localStorage.setItem('ayoka-demo-v1',JSON.stringify(state));window.dispatchEvent(new Event('ayoka-changed'));return {ok:true};
}
async function uploadFile(file:File){if(file.size>8*1024*1024)throw new Error('Choisis une image de moins de 8 Mo.');if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw new Error('Choisis un fichier PNG, JPEG ou WebP.');if(demo)return new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result));r.onerror=()=>reject(new Error('Image illisible.'));r.readAsDataURL(file);});const f=new FormData();f.append('file',file);const res=await fetch('/api/upload',{method:'POST',body:f});const data:any=await res.json();if(!res.ok)throw new Error(data.error);return data.image;}

export async function upload(file:File){if(file.size>8*1024*1024)throw new Error('Choisis une image de moins de 8 Mo.');if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw new Error('Choisis un fichier PNG, JPEG ou WebP.');const bitmap=await createImageBitmap(file);const ratio=Math.min(1,1280/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));const ctx=canvas.getContext('2d');if(!ctx){bitmap.close();throw new Error('Image non prise en charge.');}ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Image illisible.')),'image/webp',.84));return uploadFile(new File([blob],file.name.replace(/\.[^.]+$/,'')+'.webp',{type:blob.type}));}
