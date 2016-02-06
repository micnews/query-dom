import queryDom from '../lib/index';
import fs from 'fs';

const input = fs.readFileSync(__dirname + '/../../benchmark/example.html', 'utf8');

if (console.profile) {
  console.profile('benchmark');
}
const start = new Date();
let count = 0;
while (new Date() - start < 2000) {
  count++;
  queryDom(input);
}
const diff = (new Date() - start) / count;
if (console.profileEnd) {
  console.profileEnd('benchmark');
}

console.log(`parse: ${diff} ms`);
