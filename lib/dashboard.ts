import {due, type Contact} from './crm';
import type {Product} from './types';

export type Order={id:string;created:string;status:string;data:{name:string;phone?:string;city?:string;address?:string;items:any[];total:number;payment?:string}};
export const orderStages=['Nouvelle','Confirmée','En préparation','Expédiée','Terminée'] as const;
export const ciDate=(date:Date)=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Africa/Abidjan'}).format(date);
export const shortDate=(date:string)=>new Date(date+'T12:00:00Z').toLocaleDateString('fr-CI',{day:'numeric',month:'short',timeZone:'Africa/Abidjan'});

export function overview(orders:Order[],contacts:Contact[],products:Product[],days:number,now=new Date()){
 const end=Date.parse(ciDate(now)+'T00:00:00Z')+86400000;
 const start=end-days*86400000, previousStart=start-days*86400000;
 const time=(o:Order)=>Date.parse(o.created);
 const current=orders.filter(o=>time(o)>=start&&time(o)<end);
 const completed=current.filter(o=>o.status==='Terminée');
 const total=(list:Order[])=>list.reduce((sum,o)=>sum+(Number(o.data.total)||0),0);
 const revenue=total(completed),previousRevenue=total(orders.filter(o=>o.status==='Terminée'&&time(o)>=previousStart&&time(o)<start));
 const step=days===7?1:days===30?3:9;
 const series=Array.from({length:Math.ceil(days/step)},(_,i)=>{
  const from=start+i*step*86400000, to=Math.min(from+step*86400000,end);
  return {date:ciDate(new Date(from)),end:ciDate(new Date(to-1)),total:total(completed.filter(o=>time(o)>=from&&time(o)<to))};
 });
 return {revenue,previousRevenue,completed,current,series,
  average:completed.length?Math.round(revenue/completed.length):0,
  follow:contacts.filter(due).sort((a,b)=>a.nextFollowUp.localeCompare(b.nextFollowUp)),
  activeContacts:contacts.filter(c=>c.status!=='Archivé'),
  newContacts:contacts.filter(c=>Date.parse(c.createdAt)>=start&&Date.parse(c.createdAt)<end&&c.status!=='Archivé'),
  pending:orders.filter(o=>o.status!=='Terminée').sort((a,b)=>time(a)-time(b)),
  ready:products.filter(p=>p.active&&p.price!==null&&p.stock>0&&p.variants.length>0&&p.variants.every(v=>v.image)),
  missing:products.filter(p=>p.price===null),low:products.filter(p=>p.price!==null&&p.stock<5),
  latest:[...orders].sort((a,b)=>time(b)-time(a)).slice(0,5),
  from:ciDate(new Date(start)),to:ciDate(new Date(end-1))};
}
