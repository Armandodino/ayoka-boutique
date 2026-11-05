import type {Metadata} from 'next';
import './globals.css';
import './gallery.css';
import './hero-layout.css';
export const metadata:Metadata={title:'Ayoka Boutique · Côte d’Ivoire',description:'Découvre les vêtements et accessoires Ayoka. Collection Signature et Studio, en Côte d’Ivoire.',manifest:'/site.webmanifest',icons:{icon:[{url:'/favicon.ico?v=ayoka-circle',sizes:'any'},{url:'/favicon-ayoka-32.png',sizes:'32x32',type:'image/png'}],apple:[{url:'/apple-touch-icon.png',sizes:'180x180'}]}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>;}

import './crm.css';

import './motion.css';
