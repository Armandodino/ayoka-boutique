import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig({plugins:[react()],define:{'import.meta.env.VITE_DEMO':JSON.stringify('true')},resolve:{alias:{'@':path.resolve('.')}},publicDir:'public',build:{outDir:'netlify-dist',rollupOptions:{input:'index.html'}},server:{host:'127.0.0.1',port:5173,open:false}});

