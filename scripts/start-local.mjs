import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
if(!existsSync('node_modules/vite/bin/vite.js')){console.error('Installe les dépendances avec npm ci avant de lancer la boutique.');process.exit(1);}
const child=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.demo.config.ts','--open',process.argv.includes('--admin')?'/admin':'/'],{stdio:'inherit'});
process.on('SIGINT',()=>child.kill('SIGINT'));
child.on('exit',code=>process.exit(code||0));
