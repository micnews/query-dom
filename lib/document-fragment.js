import {querySelector, querySelectorAll, getElementsByTagName} from './query';

function DocumentFragment () {
  this.nodeName = '#document-fragment';
  this.childNodes = [];
}

DocumentFragment.prototype = {
  querySelector, querySelectorAll, getElementsByTagName
};

export default DocumentFragment;
