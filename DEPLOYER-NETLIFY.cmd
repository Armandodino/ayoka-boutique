@echo off
cd /d "%~dp0"
echo Connexion au compte Netlify pour publier l'essai Ayoka.
call npx --yes netlify-cli login
if errorlevel 1 goto fin
call npx --yes netlify-cli deploy --dir=netlify-dist --prod --no-build
:fin
pause
