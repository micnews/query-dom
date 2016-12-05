/* eslint-disable import/no-extraneous-dependencies, no-console */

import { readFileSync } from 'fs';
import jsdom from 'jsdom';
import minidom from 'minidom';
import parse5 from 'parse5';
import { join } from 'path';

import queryDom from '../lib/index';

const input = readFileSync(join(__dirname, '/../../benchmark/example.html'), 'utf8');
const parseJsdom = () => jsdom.jsdom(input);
const parseParse5 = () => parse5.parse(input);
const parsers = {
  queryDom, parse5: parseParse5, minidom, jsdom: parseJsdom
};

Object.keys(parsers).forEach((key) => {
  // warm up
  for (let i = 0; i < 20; i += 1) {
    parsers[key](input);
  }

  const start = new Date();
  let count = 0;
  while (new Date() - start < 2000) {
    count += 1;
    parsers[key](input);
  }
  const diff = (new Date() - start) / count;

  console.log(`parse ${key}: ${diff} ms`);
});

console.log();
