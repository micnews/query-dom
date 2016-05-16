import {readFileSync} from 'fs';
import jsdom from 'jsdom';
import minidom from 'minidom';
import queryDom from '../lib/index';
import parse5 from 'parse5';
import {join} from 'path';

const input = readFileSync(join(__dirname, '/../../benchmark/example.html'), 'utf8');
const parseJsdom = () => {
  return jsdom.jsdom(input);
};
const parseParse5 = () => {
  return parse5.parse(input);
};
const parsers = {
  queryDom, parse5: parseParse5, minidom, jsdom: parseJsdom
};

Object.keys(parsers).forEach((key) => {
  // warm up
  for (let i = 0; i < 20; ++i) {
    parsers[key](input);
  }

  const start = new Date();
  let count = 0;
  while (new Date() - start < 2000) {
    count++;
    parsers[key](input);
  }
  const diff = (new Date() - start) / count;

  console.log(`parse ${key}: ${diff} ms`);
});

console.log();
