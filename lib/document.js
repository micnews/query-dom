import {querySelector, querySelectorAll, getElementsByTagName} from './query';

function Document () {
  this.nodeName = '#document';
  this.childNodes = [];
}

Document.prototype = {
  querySelector, querySelectorAll, getElementsByTagName
};

export default Document;
