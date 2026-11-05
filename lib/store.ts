import {env} from 'cloudflare:workers';
import {seedProducts} from './seed';
import {defaultSettings,type Product,type Settings} from './types';
export function db(){if(!env.DB)throw new Error('Catalogue momentanément indisponible.');return env.DB;}
export async function initialize(){const database=db();const marker=await database.prepare('SELECT id FROM settings WHERE id=?').bind('shop').first();if(!marker)await database.batch([...seedProducts.map(p=>database.prepare('INSERT OR IGNORE INTO products (id,data,stock,position) VALUES (?,?,?,?)').bind(p.id,JSON.stringify(p),p.stock,p.position)),database.prepare('INSERT OR IGNORE INTO settings (id,data) VALUES (?,?)').bind('shop',JSON.stringify(defaultSettings))]);}
export async function catalog(){await initialize();const rows=await db().prepare('SELECT data,stock,position FROM products ORDER BY position,id').all<{data:string;stock:number;position:number}>();return rows.results.map(r=>({...JSON.parse(r.data),stock:r.stock,position:r.position}) as Product);}
export async function shopSettings(){await initialize();const r=await db().prepare('SELECT data FROM settings WHERE id=?').bind('shop').first<{data:string}>();return {...defaultSettings,...JSON.parse(r!.data)} as Settings;}
