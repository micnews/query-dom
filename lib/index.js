import parse5 from 'parse5';
import assign from 'object-assign';
import toFastProperties from 'to-fast-properties';
import Element from './element';

const treeAdapter = assign({}, parse5.treeAdapters.default);

treeAdapter.createElement = (tagName, namespaceURI, attrs) => {
  return new Element(tagName, namespaceURI, attrs);
};

toFastProperties(treeAdapter);

const parse = (html) => {
  return parse5.parseFragment(html, {treeAdapter}).childNodes;
};

module.exports = parse;
