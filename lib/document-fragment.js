import {querySelector, querySelectorAll, getElementsByTagName} from './query';

function DocumentFragment () {
  this.nodeName = '#document-fragment';
  this.childNodes = [];
}

DocumentFragment.prototype = {
  querySelector,
  querySelectorAll,
  getElementsByTagName,

  get textContent () {
    return null;
  }
};

export default DocumentFragment;
