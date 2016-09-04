import Node from './node';
import {inherits} from 'util';

function Document () {
  Node.call(this, '#document');
}

inherits(Document, Node);

export default Document;
