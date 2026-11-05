export type Variant={color:string;image:string};
export type Product={id:string;name:string;category:string;collection:string;description:string;price:number|null;stock:number;sizes:string[];variants:Variant[];active:boolean;featured:boolean;position:number};
export type Settings={headline:string;intro:string;whatsapp:string;deliveryFee:number|null;deliveryText:string;ordersEnabled:boolean};
export const defaultSettings:Settings={headline:'LA CÔTE D’IVOIRE. DANS LA PEAU.',intro:'D’Abidjan à Bouaké, de Daloa à Yamoussoukro. Le style nous rassemble.',whatsapp:'',deliveryFee:null,deliveryText:'Les modalités de livraison seront précisées avant l’ouverture des commandes.',ordersEnabled:false};
export const money=(n:number|null)=>n===null?'Prix à venir':new Intl.NumberFormat('fr-CI',{maximumFractionDigits:0}).format(n)+' FCFA';
