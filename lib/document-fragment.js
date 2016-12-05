import { inherits } from 'util';

import Node from './node';

function DocumentFragment() {
  Node.call(this, '#document-fragment');
}

inherits(DocumentFragment, Node);

export default DocumentFragment;
