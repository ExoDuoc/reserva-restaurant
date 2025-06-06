@echo off
echo Iniciando la aplicación...

:: Verificar si Node.js está instalado
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js no está instalado o no está en el PATH.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

:: Verificar si Angular CLI está instalado
echo Verificando dependencias...
npm list -g @angular/cli >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Instalando Angular CLI globalmente...
    npm install -g @angular/cli@17.3.17
)

:: Instalar dependencias
echo Instalando dependencias...
npm install

:: Iniciar la aplicación
echo Iniciando el servidor de desarrollo...
start http://localhost:4200
ng serve --open

pause
