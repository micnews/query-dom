import Node from './node';
import {inherits} from 'util';

function DocumentFragment () {
  Node.call(this, '#document-fragment');
}

inherits(DocumentFragment, Node);

export default DocumentFragment;
