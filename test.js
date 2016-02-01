import test from 'ava';
import 'babel-core/register';
import readOnlyDom from './lib';

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

test('getAttribute()', t => {
  const actual = readOnlyDom('<div foo="bar"></div>');
  t.same(actual[0].getAttribute('does-not-exists'), null,
    'none existing attribute');
  t.same(actual[0].getAttribute('does-not-exists'), null,
    'none existing attribute (cached)');
  t.same(actual[0].getAttribute('foo'), 'bar', 'existing attribute');
  t.same(actual[0].getAttribute('foo'), 'bar', 'existing attribute (cached)');
});

test('hasAttribute()', t => {
  const actual = readOnlyDom('<div foo="bar"></div>');
  t.same(actual[0].hasAttribute('does-not-exists'), false,
    'none existing attribute');
  t.same(actual[0].hasAttribute('does-not-exists'), false,
    'none existing attribute (cached)');
  t.same(actual[0].hasAttribute('foo'), true, 'existing attribute');
  t.same(actual[0].hasAttribute('foo'), true, 'existing attribute (cached)');
});

test('getElementsByTagName()', t => {
  const actual = readOnlyDom(`<div>
    <foo></foo>
    <beep><foo></foo></beep>
  </div>`)[0].getElementsByTagName('foo');
  t.same(actual.length, 2);
  t.same(actual[0].tagName, 'FOO');
  t.same(actual[0].parentNode.tagName, 'DIV');
  t.same(actual[1].tagName, 'FOO');
  t.same(actual[1].parentNode.tagName, 'BEEP');
});

test('getElementsByTagName() tricky', t => {
  const actual = readOnlyDom(`<div>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`)[0].getElementsByTagName('foo');
  t.same(actual.length, 2);
  t.same(actual[0].tagName, 'FOO');
  t.same(actual[0].parentNode.tagName, 'BEEP');
  t.same(actual[1].tagName, 'FOO');
  t.same(actual[1].parentNode.tagName, 'DIV');
});
