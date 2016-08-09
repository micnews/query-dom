import {querySelector, querySelectorAll, getElementsByTagName} from './query';

function Document () {
  this.nodeName = '#document';
  this.childNodes = [];
}

Document.prototype = {
  querySelector, querySelectorAll, getElementsByTagName,

  get textContent () {
    return null;
  }
};

export default Document;
