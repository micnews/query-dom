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
  getElementsByTagName (tagName) {
    tagName = tagName.toUpperCase();
    const result = [];

    getElementsByTagName(this.childNodes, tagName, result);

    return result;
  },

  getAttribute (name) {
    assertAttributesCached(this);
    const value = this._attributes[name];
    return value === undefined ? null : value;
  },

  hasAttribute (name) {
    assertAttributesCached(this);
    return this._attributes[name] !== undefined;
  }
};

function assertAttributesCached (elm) {
  const {_attributes, _attributesCached, attrs} = elm;
  if (_attributesCached) {
    return;
  }

  elm._attributesCached = true;

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
