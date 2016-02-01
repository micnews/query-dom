import Set from 'es6-set';

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
}

Element.prototype = {
  getElementsByTagName (tagName) {
    tagName = tagName.toUpperCase();
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

function setupClassList ({_attributes}) {
  const className = (_attributes['class'] || '').trim();

  if (!className) {
    return {
      contains: () => false
    };
  }

  const classes = new Set(
    className.split(' ').filter(Boolean)
  );

  return {
    contains: (name) => classes.has(name)
  };
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
