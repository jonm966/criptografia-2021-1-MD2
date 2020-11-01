// Autor : Jonas Montoya Landa
// Fecha 31/10/20
// Descripción: Algoritmo MD2

const readline = require('readline');
const hash = require('./hash');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

r1.on('line', line => controlador(line));

const controlador = mensaje => hash(mensaje);