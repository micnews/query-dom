import { inherits } from 'util';

import Node from './node';

function Document() {
  Node.call(this, '#document');
}

inherits(Document, Node);

export default Document;
