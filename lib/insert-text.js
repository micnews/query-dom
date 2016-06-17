function Text (data) {
  this.nodeName = '#text';
  this.data = data;
  this.parentNode = null;
}

export default treeAdapter => function (parentNode, text) {
  if (parentNode.childNodes.length) {
    var prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

    if (prevNode.nodeName === '#text') {
      prevNode.data += text;
      return;
    }
  }

  treeAdapter.appendChild(parentNode, new Text(text));
};
