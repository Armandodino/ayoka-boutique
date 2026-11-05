import {getChatGPTUser} from '@/app/chatgpt-auth';
import {env} from 'cloudflare:workers';
export async function isAdmin(){const user=await getChatGPTUser();if(!user)return false;return user.email.toLowerCase()===String((env as unknown as Record<string,string>).ADMIN_EMAIL||'').toLowerCase()||(import.meta.env.DEV&&user.userId==='local_seedy');}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin;}
export function failure(error:unknown,status=503){console.error(error);return Response.json({error:status===503?'Le service est momentanément indisponible. Réessaie dans un instant.':error instanceof Error?error.message:'Demande invalide.'},{status});}
