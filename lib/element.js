import { inherits } from 'util';

import setupStyle from './style';
import ClassList from './class-list';
import Node from './node';

function Element(tagName, namespaceURI, attrs) {
  Node.call(this, tagName);
  this.tagName = tagName;
  this.namespaceURI = namespaceURI;
  this.parentNode = null;
  this.attrs = attrs;
  this.attributes = attrs;
  this._attributes = {};

  for (let i = 0; i < attrs.length; i += 1) {
    this._attributes[attrs[i].name] = attrs[i].value;
  }

  this.classList = new ClassList(this._attributes.class);
  this.style = setupStyle(this._attributes.style);
}

inherits(Element, Node);

Element.prototype.getAttribute = function _getAttribute(name) {
  const value = this._attributes[name];
  return value === undefined ? null : value;
};

Element.prototype.hasAttribute = function _hasAttribute(name) {
  return this._attributes[name] !== undefined;
};

const getter = (name, fn) => Object.defineProperty(Element.prototype, name, { get: fn });

getter('innerHTML', function _innerHTML() {
  return this.childNodes.map(child => child.outerHTML || child.data).join('');
});

getter('outerHTML', function _outerHTML() {
  const attributes = Object.keys(this._attributes).map(key => `${key}="${this._attributes[key]}"`).join(' ');
  return attributes.length
    ? `<${this.tagName} ${attributes}>${this.innerHTML}</${this.tagName}>`
    : `<${this.tagName}>${this.innerHTML}</${this.tagName}>`;
});

getter('textContent', function _textContent() {
  return this.childNodes.map(child => child.textContent).join('');
});

export default Element;
