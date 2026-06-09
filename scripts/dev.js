#!/usr/bin/env node
// Runs the client (Vite) and server (Express) together for local development.
const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');

function run(name, cwd, color) {
  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.join(root, cwd),
    shell: true,
  });
  const prefix = `\x1b[${color}m[${name}]\x1b[0m `;
  child.stdout.on('data', (d) =>
    process.stdout.write(prefix + d.toString().replace(/\n/g, '\n' + prefix))
  );
  child.stderr.on('data', (d) => process.stderr.write(prefix + d.toString()));
  child.on('exit', (code) => {
    console.log(prefix + `exited with code ${code}`);
    process.exit(code ?? 0);
  });
  return child;
}

run('server', 'server', '36'); // cyan
run('client', 'client', '32'); // green
