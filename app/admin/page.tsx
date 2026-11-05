import Admin from './admin';
import {requireChatGPTUser} from '../chatgpt-auth';
import {isAdmin} from '@/lib/security';
export const dynamic='force-dynamic';
export default async function AdminPage(){await requireChatGPTUser('/admin');if(!await isAdmin())return <main className="empty"><h1>Accès réservé.</h1><p>Connecte-toi avec le compte autorisé pour administrer la boutique.</p><a href="/">Retour à la boutique</a></main>;return <Admin/>;}
