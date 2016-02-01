import setupStyle from './style';
import setupClassList from './class-list';

function Element (tagName, namespaceURI, attrs) {
  this.tagName = tagName;
  this.nodeName = tagName;
  this.namespaceURI = namespaceURI;
  this.childNodes = [];
  this.parentNode = null;
  this.attrs = attrs;
  this._attributes = {};
  setupAttributes(this);
  this.classList = setupClassList(this);
  this.style = setupStyle(this);
}

Element.prototype = {
  getElementsByTagName (tagName) {
    tagName = tagName.toLowerCase();
    const result = [];

    getElementsByTagName(this.childNodes, tagName, result);

    return result;
  },

  getAttribute (name) {
    const value = this._attributes[name];
    return value === undefined ? null : value;
  },

  hasAttribute (name) {
    return this._attributes[name] !== undefined;
  }
};

function setupAttributes ({_attributes, attrs}) {
  for (let i = 0; i < attrs.length; ++i) {
    _attributes[attrs[i].name] = attrs[i].value;
  }
}

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

export default Element;
