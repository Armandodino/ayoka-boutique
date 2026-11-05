import React,{lazy,Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import Storefront from '../app/storefront';
import {seedProducts} from '../lib/seed';
import {defaultSettings} from '../lib/types';
import '../app/globals.css';
import '../app/gallery.css';
import '../app/hero-layout.css';
const Admin=lazy(()=>import('../app/admin/admin'));
const GalleryView=lazy(()=>import('../app/galerie/gallery-view'));
createRoot(document.getElementById('root')!).render(<Suspense fallback={<div className="admin-empty" role="status">Ayoka Boutique · Chargement…</div>}>{location.pathname.startsWith('/admin')?<Admin/>:location.pathname.startsWith('/galerie')?<GalleryView/>:<Storefront initialProducts={seedProducts} initialSettings={defaultSettings}/>}</Suspense>);

import '../app/motion.css';
