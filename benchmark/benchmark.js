import queryDom from '../lib/index';
import fs from 'fs';

const input = fs.readFileSync(__dirname + '/../../benchmark/example.html', 'utf8');

if (console.profile) {
  console.profile('parse');
}
let start = new Date();
let count = 0;
while (new Date() - start < 2000) {
  count++;
  queryDom(input);
}
let diff = (new Date() - start) / count;
if (console.profileEnd) {
  console.profileEnd('parse');
}

console.log(`parse: ${diff} ms`);

const dom = queryDom(`<div>${input}</div>`);

if (console.profile) {
  console.profile('getElementsByTagName');
}

start = new Date();
count = 0;
while (new Date() - start < 2000) {
  for (let i = 0; i < 1000; ++i) {
    count++;
    dom[0].getElementsByTagName('div');
  }
}
diff = (new Date() - start) / count;
if (console.profileEnd) {
  console.profileEnd('getElementsByTagName');
}

console.log(`getElementsByTagName: ${diff} ms`);
