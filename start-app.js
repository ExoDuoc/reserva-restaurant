const { exec } = require('child_process');
const path = require('path');

console.log('Iniciando la aplicación...');

// Ejecutar el comando ng serve
exec('npx ng serve --port 4200 --open', {
  cwd: __dirname,
  shell: true
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
