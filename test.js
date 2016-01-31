import test from 'ava';
import 'babel-core/register';
import readOnlyDom from './';

test('tagNames & nodeNames are upper case', t => {
  const actual = readOnlyDom('<div></div><DIV></DIV>');

  t.same(actual.length, 2);
  t.same(actual[0].tagName, 'DIV');
  t.same(actual[0].nodeName, 'DIV');
  t.same(actual[1].tagName, 'DIV');
  t.same(actual[1].nodeName, 'DIV');
});

test('nested has correct tagNames & nodeNames', t => {
  const actual = readOnlyDom('<div><span></span></div>');

  t.same(actual.length, 1);
  t.same(actual[0].tagName, 'DIV');
  t.same(actual[0].nodeName, 'DIV');

  t.same(actual[0].childNodes[0].tagName, 'SPAN');
  t.same(actual[0].childNodes[0].nodeName, 'SPAN');
});
