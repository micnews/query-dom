function Text(data) {
  this.nodeName = '#text';
  this.data = data;
  this.parentNode = null;
}

Text.prototype = {
  get textContent() {
    return this.data;
  }
};

export default treeAdapter => (parentNode, text) => {
  if (parentNode.childNodes.length) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

    if (prevNode.nodeName === '#text') {
      prevNode.data += text;
      return;
    }
  }

  treeAdapter.appendChild(parentNode, new Text(text));
};
