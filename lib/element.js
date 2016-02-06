import setupStyle from './style';
import ClassList from './class-list';

function Element (tagName, namespaceURI, attrs) {
  this.tagName = tagName;
  this.nodeName = tagName;
  this.namespaceURI = namespaceURI;
  this.childNodes = [];
  this.parentNode = null;
  this.attrs = attrs;
  const attributes = this._attributes = {};

  for (let i = 0; i < attrs.length; ++i) {
    attributes[attrs[i].name] = attrs[i].value;
  }

  this.classList = new ClassList(attributes['class']);
  this.style = setupStyle(attributes.style);
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
