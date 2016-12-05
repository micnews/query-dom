import parse5 from 'parse5';
import assign from 'object-assign';
import toFastProperties from 'to-fast-properties';
import Element from './element';
import setupInsertText from './insert-text';
import Document from './document';
import DocumentFragment from './document-fragment';

const treeAdapter = assign({}, parse5.treeAdapters.default);

treeAdapter.createElement = (tagName, namespaceURI, attrs) =>
  new Element(tagName, namespaceURI, attrs);
treeAdapter.createDocument = () => new Document();
treeAdapter.createDocumentFragment = () => new DocumentFragment();
treeAdapter.insertText = setupInsertText(treeAdapter);

delete treeAdapter.insertTextBefore;

toFastProperties(treeAdapter);

const parse = html =>
  parse5.parse(html, { treeAdapter });
const parseFragment = html =>
  parse5.parseFragment(html, { treeAdapter });
const parseLegacy = html => parseFragment(html).childNodes;

assign(parseLegacy, { parse, parseFragment });

module.exports = parseLegacy;
