const { spawn } = require('child_process');
const path = require('path');

// Configuración
const port = 4200;
const host = 'localhost';

// Comando para iniciar Angular
const ngServe = spawn('npx', [
  'ng',
  'serve',
  '--port', port,
  '--host', host,
  '--disable-host-check',
  '--open'
], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

ngServe.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
});

ngServe.on('close', (code) => {
  console.log(`Servidor cerrado con código ${code}`);
});

// Manejo de la terminación del proceso
process.on('SIGINT', () => {
  console.log('Deteniendo el servidor...');
  ngServe.kill();
  process.exit();
});
