import setupStyle from './style';
import ClassList from './class-list';
import {querySelector, querySelectorAll, getElementsByTagName} from './query';

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

Element.prototype = {
  querySelector, querySelectorAll, getElementsByTagName,

  getAttribute (name) {
    const value = this._attributes[name];
    return value === undefined ? null : value;
  },
  hasAttribute (name) {
    return this._attributes[name] !== undefined;
  },

  get innerHTML () {
    return this.childNodes.map(child => child.outerHTML || child.data).join('');
  },

  get outerHTML () {
    const attributes = Object.keys(this._attributes).map(key => `${key}="${this._attributes[key]}"`).join(' ');
    return attributes.length
      ? `<${this.tagName} ${attributes}>${this.innerHTML}</${this.tagName}>`
      : `<${this.tagName}>${this.innerHTML}</${this.tagName}>`;
  },

  get textContent () {
    return this.childNodes.map(child => child.textContent).join('');
  }
};

export default Element;
