import css from 'cssauron-html';

const queryOne = (childNodes, selector) => {
  for (var i = 0; i < childNodes.length; i++) {
    let elm = childNodes[i];
    if (selector(elm)) {
      return elm;
    }
    if (elm.childNodes) {
      const result = queryOne(elm.childNodes, selector);
      if (result) {
        return result;
      }
    }
  }
};

const queryAll = (childNodes, selector, result) => {
  for (var i = 0; i < childNodes.length; i++) {
    let elm = childNodes[i];
    if (selector(elm)) {
      result.push(elm);
    }
    if (elm.childNodes) {
      queryAll(elm.childNodes, selector, result);
    }
  }
  return result;
};

export const getElementsByTagName = function (tagName) {
  tagName = tagName.toLowerCase();
  const selector = elm => elm.tagName === tagName;

  return queryAll(this.childNodes, selector, []);
};

export const querySelector = function (query) {
  return queryOne(this.childNodes, css(query));
};

export const querySelectorAll = function (query) {
  return queryAll(this.childNodes, css(query), []);
};
