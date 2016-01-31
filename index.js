import parse5 from 'parse5';

const parse = (html) => {
  const childNodes = parse5.parseFragment(html).childNodes;
  const queue = childNodes.slice();

  while (queue.length) {
    let elm = queue.pop();

    if (!elm.tagName) {
      continue;
    }

    elm.tagName = elm.nodeName = elm.tagName.toUpperCase();

    for (let i = 0; i < elm.childNodes.length; i++) {
      queue.push(elm.childNodes[i]);
    }
  }

  return childNodes;
};

module.exports = parse;
