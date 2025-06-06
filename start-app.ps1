# Script para iniciar la aplicación Angular

# Mostrar mensaje de inicio
Write-Host "Iniciando la aplicación..." -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "Node.js versión: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js no está instalado o no está en el PATH." -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Cyan
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al instalar las dependencias." -ForegroundColor Red
    exit 1
}

# Iniciar la aplicación
Write-Host "Iniciando el servidor de desarrollo..." -ForegroundColor Green
Write-Host "Abre tu navegador en: http://localhost:4200" -ForegroundColor Cyan

# Abrir el navegador
Start-Process "http://localhost:4200"

# Iniciar el servidor de Angular
ng serve --open --port 4200 --host 0.0.0.0 --disable-host-check
