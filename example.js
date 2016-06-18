import {parse, parseFragment} from 'query-dom';

const document = parse('<div><foo style="font-size: 12px" class="bar"></foo></div>');
const child = document.getElementsByTagName('foo')[0];

console.log(child.style.fontSize);
console.log(child.classList.contains('bar'), child.classList.contains('bas'));

const fragment = parseFragment('<div><foo style="font-size: 12px" class="bar"></foo><foo class="bar">bas</bar></div>');
const children = fragment.querySelectorAll('.bar');

console.log('children', children);
