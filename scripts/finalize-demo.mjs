import {writeFileSync} from 'node:fs';
writeFileSync('netlify-dist/_redirects','/* /index.html 200\n');
writeFileSync('netlify-dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
