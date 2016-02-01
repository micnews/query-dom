import test from 'ava';
import 'babel-core/register';
import readOnlyDom from './lib';
import tsml from 'tsml';

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

test('classList.contains()', t => {
  const actual = readOnlyDom(tsml`
    <div></div>
    <div class="foo"></div>
    <div class="foo bar"></div>
  `);

  t.same(actual.length, 3);

  t.notOk(actual[0].classList.contains('foo'));
  t.ok(actual[1].classList.contains('foo'));
  t.notOk(actual[1].classList.contains('bar'));
  t.ok(actual[2].classList.contains('foo'));
  t.ok(actual[2].classList.contains('bar'));
  t.notOk(actual[2].classList.contains('bas'));
});

test('style', t => {
  const actual = readOnlyDom(tsml`
    <div style="font-size: 14px"></div>
    <div style="
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -ms-border-radius: 10px;
      border-radius: 10px;
    "></div>
    <div></div>
  `);
  const actual1 = actual[0].style;
  const actual2 = actual[1].style;
  const actual3 = actual[2].style;
  const expected1 = {
    fontSize: '14px'
  };
  const expected2 = {
    WebkitBorderRadius: '10px',
    MozBorderRadius: '10px',
    msBorderRadius: '10px',
    borderRadius: '10px'
  };
  const expected3 = {};

  t.same(actual1, expected1);
  t.same(actual2, expected2);
  t.same(actual3, expected3);
});
