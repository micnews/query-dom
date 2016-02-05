import parse5 from 'parse5';
import assign from 'object-assign';
import toFastProperties from 'to-fast-properties';
import Element from './element';

const treeAdapter = assign({}, parse5.treeAdapters.default);

treeAdapter.createElement = (tagName, namespaceURI, attrs) =>
  new Element(tagName, namespaceURI, attrs);

treeAdapter.insertText = function (parentNode, text) {
  if (parentNode.childNodes.length) {
    var prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

    if (prevNode.nodeName === '#text') {
      prevNode.data += text;
      return;
    }
  }

  treeAdapter.appendChild(parentNode, new Text(text));
};

delete treeAdapter.insertTextBefore;

toFastProperties(treeAdapter);

const parse = (html) => {
  return parse5.parseFragment(html, {treeAdapter}).childNodes;
};

function Text (data) {
  this.nodeName = '#text';
  this.data = data;
  this.parentNode = null;
}

module.exports = parse;
