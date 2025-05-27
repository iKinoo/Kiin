import { readFileSync } from 'fs';

const deps = JSON.parse(readFileSync('deps.json', 'utf8'));

for (const [mod, imports] of Object.entries(deps)) {
  console.log(`${mod} -> CBO: ${imports.length}`);
}

console.log('------------------');

const values = Object.values(deps).map(d => d.length);
const total = values.reduce((a, b) => a + b, 0);
const max = Math.max(...values);
const min = Math.min(...values);
const avg = total / values.length;

console.log(`CBO total: ${total}`);
console.log(`CBO promedio: ${avg.toFixed(2)}`);
console.log(`CBO máximo: ${max}`);
console.log(`CBO mínimo: ${min}`);

console.log('------------------');