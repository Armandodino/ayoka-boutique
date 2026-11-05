export const stages=['Prospect','À relancer','Client','Archivé'] as const;
export type Contact={id:string;name:string;phone:string;email:string;city:string;status:typeof stages[number];source:'WhatsApp'|'Instagram'|'Site'|'Boutique'|'Autre';tags:string[];notes:string;nextFollowUp:string;createdAt:string;updatedAt:string};
export function phoneKey(phone:string){const p=phone.replace(/\D/g,'');return p.length===10?'225'+p:p;}
export function today(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Africa/Abidjan'}).format(new Date());}
export function due(c:Contact){return c.status!=='Archivé'&&!!c.nextFollowUp&&c.nextFollowUp<=today();}
