import {catalog,shopSettings} from '@/lib/store';
import {failure} from '@/lib/security';
export async function GET(){try{return Response.json({products:(await catalog()).filter(p=>p.active),settings:await shopSettings()},{headers:{'Cache-Control':'no-store'}});}catch(e){return failure(e);}}
