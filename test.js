import test from 'ava';
import 'babel-core/register';
import readOnlyDom from './';

test('basic', t => {
  t.ok(readOnlyDom('<div></div>'));
});
