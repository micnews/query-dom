import cssauron from 'cssauron';

const css = cssauron({
  tag: node => node.tagName,
  contents: node => node.textContent,
  id: node => node.getAttribute('id'),
  class: node => node.getAttribute('class'),
  parent: 'parentNode',
  children: node => node.childNodes.filter(child => child.tagName),
  attr: (node, attr) => node.getAttribute(attr) || ''
});

const queryOne = (childNodes, selector) => {
  for (let i = 0; i < childNodes.length; i += 1) {
    const elm = childNodes[i];
    if (elm.tagName && selector(elm)) {
      return elm;
    }
    if (elm.childNodes) {
      const result = queryOne(elm.childNodes, selector);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

const queryAll = (childNodes, selector, result) => {
  for (let i = 0; i < childNodes.length; i += 1) {
    const elm = childNodes[i];
    if (elm.tagName && selector(elm)) {
      result.push(elm);
    }
    if (elm.childNodes) {
      queryAll(elm.childNodes, selector, result);
    }
  }
  return result;
};

function Node(nodeName) {
  this.nodeName = nodeName;
  this.childNodes = [];
}

Node.prototype = {
  get textContent() {
    return null;
  },

  getElementsByTagName(tagName) {
    const selector = elm => elm.tagName === tagName.toLowerCase();

    return queryAll(this.childNodes, selector, []);
  },

  querySelector(query) {
    return queryOne(this.childNodes, css(query));
  },

  querySelectorAll(query) {
    return queryAll(this.childNodes, css(query), []);
  }
};

export default Node;
