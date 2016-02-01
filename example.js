import queryDom from 'query-dom';

const elm = queryDom('<div><foo style="font-size: 12px" class="bar"></foo></div>')[0];
const child = elm.getElementsByTagName('foo')[0];

console.log(child.style.fontSize);
console.log(child.classList.contains('bar'), child.classList.contains('bas'));
