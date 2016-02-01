import parse5 from 'parse5';
import assign from 'object-assign';
import toFastProperties from 'to-fast-properties';

const treeAdapter = assign({}, parse5.treeAdapters.default);

function getElementsByTagName (childNodes, tagName, result) {
  for (var i = 0; i < childNodes.length; i++) {
    let elm = childNodes[i];
    if (elm.tagName === tagName) {
      result.push(elm);
    }
    if (elm.childNodes) {
      getElementsByTagName(elm.childNodes, tagName, result);
    }
  }
}

function Element (tagName, namespaceURI, attrs) {
  this.tagName = tagName;
  this.nodeName = tagName;
  this.namespaceURI = namespaceURI;
  this.childNodes = [];
  this.parentNode = null;
  this.attrs = attrs;
  this._attributes = {};
  this._attributesCached = false;
}

Element.prototype = {
  _assertAttributesCached () {
    const {_attributes, _attributesCached, attrs} = this;
    if (_attributesCached) {
      return;
    }

    this._attributesCached = true;

    for (let i = 0; i < attrs.length; ++i) {
      _attributes[attrs[i].name] = attrs[i].value;
    }
  },

  getElementsByTagName (tagName) {
    tagName = tagName.toUpperCase();
    const result = [];

    getElementsByTagName(this.childNodes, tagName, result);

    return result;
  },

  getAttribute (name) {
    this._assertAttributesCached();
    const value = this._attributes[name];
    return value === undefined ? null : value;
  },

  hasAttribute (name) {
    this._assertAttributesCached();
    return this._attributes[name] !== undefined;
  }
};

treeAdapter.createElement = (tagName, namespaceURI, attrs) => {
  return new Element(tagName, namespaceURI, attrs);
};

toFastProperties(treeAdapter);

const parse = (html) => {
  const childNodes = parse5.parseFragment(html, {treeAdapter}).childNodes;
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
