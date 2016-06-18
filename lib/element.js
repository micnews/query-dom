import setupStyle from './style';
import ClassList from './class-list';
import css from 'cssauron-html';

function Element (tagName, namespaceURI, attrs) {
  this.tagName = tagName;
  this.nodeName = tagName;
  this.namespaceURI = namespaceURI;
  this.childNodes = [];
  this.parentNode = null;
  this.attrs = attrs;
  this.attributes = attrs;
  const attributes = this._attributes = {};

  for (let i = 0; i < attrs.length; ++i) {
    attributes[attrs[i].name] = attrs[i].value;
  }

  this.classList = new ClassList(attributes['class']);
  this.style = setupStyle(attributes.style);
}

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

Element.prototype = {
  getElementsByTagName (tagName) {
    tagName = tagName.toLowerCase();
    const selector = elm => elm.tagName === tagName;

    return queryAll(this.childNodes, selector, []);
  },

  querySelector (query) {
    return queryOne(this.childNodes, css(query));
  },

  querySelectorAll (query) {
    return queryAll(this.childNodes, css(query), []);
  },

  getAttribute (name) {
    const value = this._attributes[name];
    return value === undefined ? null : value;
  },

  hasAttribute (name) {
    return this._attributes[name] !== undefined;
  }
};

export default Element;
