import parse5 from 'parse5';
import assign from 'object-assign';
import toFastProperties from 'to-fast-properties';
import Element from './element';
import setupInsertText from './insert-text';

const treeAdapter = assign({}, parse5.treeAdapters.default);

treeAdapter.createElement = (tagName, namespaceURI, attrs) =>
  new Element(tagName, namespaceURI, attrs);

treeAdapter.insertText = setupInsertText(treeAdapter);

delete treeAdapter.insertTextBefore;

toFastProperties(treeAdapter);

const parse = (html) => {
  return parse5.parseFragment(html, {treeAdapter}).childNodes;
};

module.exports = parse;
