/* eslint-disable import/no-extraneous-dependencies */

import test from 'ava';
import 'babel-core/register';
import tsml from 'tsml';

import legacy from './lib';

const { parse, parseFragment } = legacy;

test('tagNames & nodeNames are lower case', (t) => {
  const actual = parseFragment('<div></div><DIV></DIV>').childNodes;

  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'div');
  t.is(actual[0].nodeName, 'div');
  t.is(actual[1].tagName, 'div');
  t.is(actual[1].nodeName, 'div');
});

test('nested has correct tagNames & nodeNames', (t) => {
  const actual = parseFragment('<div><span></span></div>').childNodes;

  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'div');
  t.is(actual[0].nodeName, 'div');

  t.is(actual[0].childNodes[0].tagName, 'span');
  t.is(actual[0].childNodes[0].nodeName, 'span');
});

test('getAttribute()', (t) => {
  const actual = parseFragment('<div foo="bar"></div>').childNodes;
  t.is(actual[0].getAttribute('does-not-exists'), null, 'none existing attribute');
  t.is(
    actual[0].getAttribute('does-not-exists'),
    null,
    'none existing attribute (cached)'
  );
  t.is(actual[0].getAttribute('foo'), 'bar', 'existing attribute');
  t.is(actual[0].getAttribute('foo'), 'bar', 'existing attribute (cached)');
});

test('attributes', (t) => {
  const actual = parseFragment('<div foo="bar"></div>').childNodes[0].attributes;
  const expected = [{ name: 'foo', value: 'bar' }];
  t.deepEqual(actual, expected);
});

test('hasAttribute()', (t) => {
  const actual = parseFragment('<div foo="bar"></div>').childNodes[0];
  t.is(
    actual.hasAttribute('does-not-exists'),
    false,
    'none existing attribute'
  );
  t.is(
    actual.hasAttribute('does-not-exists'),
    false,
    'none existing attribute (cached)'
  );
  t.is(actual.hasAttribute('foo'), true, 'existing attribute');
  t.is(actual.hasAttribute('foo'), true, 'existing attribute (cached)');
});

test('getElementsByTagName()', (t) => {
  const fragment = parseFragment(`<div>
    <foo></foo>
    <beep><foo></foo></beep>
  </div>`);
  const actual = fragment.getElementsByTagName('foo');
  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].parentNode.tagName, 'div');
  t.is(actual[1].tagName, 'foo');
  t.is(actual[1].parentNode.tagName, 'beep');
});

test('getElementsByTagName() tricky', (t) => {
  const actual = parseFragment(`<div>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).getElementsByTagName('foo');
  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].parentNode.tagName, 'beep');
  t.is(actual[1].tagName, 'foo');
  t.is(actual[1].parentNode.tagName, 'div');
});

test('classList.contains()', (t) => {
  const actual = parseFragment(tsml`
    <div></div>
    <div class="foo"></div>
    <div class="foo bar"></div>
  `).childNodes;

  t.deepEqual(actual.length, 3);

  t.falsy(actual[0].classList.contains('foo'));
  t.truthy(actual[1].classList.contains('foo'));
  t.falsy(actual[1].classList.contains('bar'));
  t.truthy(actual[2].classList.contains('foo'));
  t.truthy(actual[2].classList.contains('bar'));
  t.falsy(actual[2].classList.contains('bas'));
});

test('classList.contains() whitespace in className', (t) => {
  const actual = parseFragment('<div class="  foo   bar  "/>').childNodes[0].classList;

  t.truthy(actual.contains('foo'));
  t.truthy(actual.contains('bar'));
  t.falsy(actual.contains(''));
  t.falsy(actual.contains(' '));
});

test('style - single statement', (t) => {
  const actual = parseFragment('<div style="font-size: 14px"></div>').childNodes[0].style;
  const expected = {
    fontSize: '14px'
  };
  t.deepEqual(actual, expected);
});

test('style - multiple statements', (t) => {
  const actual = parseFragment(tsml`
    <div style="
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      -ms-border-radius: 10px;
      border-radius: 10px;
      border-color: ;
      : red;
    "></div>
  `).childNodes[0].style;
  const expected = {
    WebkitBorderRadius: '10px',
    MozBorderRadius: '10px',
    msBorderRadius: '10px',
    borderRadius: '10px'
  };
  t.deepEqual(actual, expected);
});

test('style - no style', (t) => {
  const actual = parseFragment('<div></div>').childNodes[0].style;
  const expected = {};
  t.deepEqual(actual, expected);
});

test('style - invalid', (t) => {
  const actual = parseFragment('<div style="foo"></div>').childNodes[0].style;
  const expected = {};
  t.deepEqual(actual, expected);
});

test('text element', (t) => {
  const expectedNodeName = '#text';
  const expectedData = 'beep boop';

  const actual = parseFragment('beep boop').childNodes[0];
  const actualNodeName = actual.nodeName;
  const actualData = actual.data;

  t.is(actualNodeName, expectedNodeName);
  t.is(actualData, expectedData);
});

test('parseFragment().querySelectorAll()', (t) => {
  const actual = parseFragment(`<div>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('foo');
  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].parentNode.tagName, 'beep');
  t.is(actual[1].tagName, 'foo');
  t.is(actual[1].parentNode.tagName, 'div');
});

test('parse().querySelectorAll()', (t) => {
  const actual = parse(`<div>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('foo');
  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].parentNode.tagName, 'beep');
  t.is(actual[1].tagName, 'foo');
  t.is(actual[1].parentNode.tagName, 'div');
});

test('element.querySelectorAll()', (t) => {
  const actual = parseFragment(`<div>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).childNodes[0].querySelectorAll('foo');
  t.is(actual.length, 2);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].parentNode.tagName, 'beep');
  t.is(actual[1].tagName, 'foo');
  t.is(actual[1].parentNode.tagName, 'div');
});

test('parseFragment().querySelector()', (t) => {
  const actual = parseFragment(`<div>
    <flipp><flopp></flopp></flipp>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).querySelector('foo');
  t.is(actual.tagName, 'foo');
  t.is(actual.parentNode.tagName, 'beep');
});

test('parse().querySelector()', (t) => {
  const actual = parse(`<div>
    <flipp><flopp></flopp></flipp>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).querySelector('foo');
  t.is(actual.tagName, 'foo');
  t.is(actual.parentNode.tagName, 'beep');
});

test('element().querySelector()', (t) => {
  const actual = parseFragment(`<div>
    <flipp><flopp></flopp></flipp>
    <beep><foo></foo></beep>
    <foo></foo>
  </div>`).childNodes[0].querySelector('foo');
  t.is(actual.tagName, 'foo');
  t.is(actual.parentNode.tagName, 'beep');
});

test('element().innerHTML', (t) => {
  const innerHTML = '<flipp hello="world"><flopp foo="bar">text</flopp></flipp>';
  const actual = parseFragment(`<div>${innerHTML}</div>`).childNodes[0].innerHTML;
  const expected = innerHTML;
  t.is(expected, actual);
});

test('element().outerHTML', (t) => {
  const outerHTML = '<div><flipp hello="world"><flopp foo="bar">text</flopp></flipp></div>';
  const actual = parseFragment(outerHTML).childNodes[0].outerHTML;
  const expected = outerHTML;
  t.is(expected, actual);
});

test('#text.textContent', (t) => {
  const actual = parseFragment('beep beep').childNodes[0].textContent;
  const expected = 'beep beep';
  t.is(actual, expected);
});

test('element().textContent', (t) => {
  const actual = parseFragment(tsml`
    <div><flipp>Foo <flopp>Bar</flopp></flipp>Fred</div>
  `).childNodes[0].textContent;
  const expected = 'Foo BarFred';
  t.is(actual, expected);
});

test('element().textContent preserves whitespace', (t) => {
  const actual = parseFragment(`<div>
    <flipp>Foo
      <flopp>Bar</flopp>
    </flipp>
    Fred
  </div>`).childNodes[0].textContent;
  const expected = '\n    Foo\n      Bar\n    \n    Fred\n  ';
  t.is(actual, expected);
});

test('document().textContent is null', (t) => {
  const actual = parse(`<!DOCTYPE html5>
    <p>Hello</p>
  </div>`).textContent;
  t.is(actual, null);
});

test('documentFragment().textContent is null', (t) => {
  const actual = parseFragment(`<p>Hello</p>
  </div>`).textContent;
  t.is(actual, null);
});

test('parse().querySelectorAll(#id)', (t) => {
  const actual = parse(`<div>
    <beep><foo id="bar"></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('#bar');
  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'foo');
});

test('parse().querySelectorAll(.class)', (t) => {
  const actual = parse(`<div>
    <beep><foo class="bar"></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('.bar');
  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'foo');
});

test('parse().querySelectorAll(tag > #id)', (t) => {
  const actual = parse(`<div>
    <beep><foo id="bar"></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('beep #bar');
  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'foo');
});

test('parse().querySelectorAll(tag + tag)', (t) => {
  const actual = parse(`<div>
    <beep><span></span><foo></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('span + foo');
  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'foo');
});

test('parse().querySelectorAll([attr=value])', (t) => {
  const actual = parse(`<div>
    <beep><foo data-name="bar"></foo></beep>
    <foo></foo>
  </div>`).querySelectorAll('[data-name="bar"]');
  t.is(actual.length, 1);
  t.is(actual[0].getAttribute('data-name'), 'bar');
});

test('parse().querySelectorAll([attr^=value])', (t) => {
  const actual = parse(`<div>
    <beep><foo data-name="foo-bar"></foo></beep>
    <beep><bar data-name="bar-foo"></bar></beep>
    <foo></foo>
  </div>`).querySelectorAll('[data-name^="foo"]');
  t.is(actual.length, 1);
  t.is(actual[0].tagName, 'foo');
  t.is(actual[0].getAttribute('data-name'), 'foo-bar');
});

test('parse().querySelectorAll(:contains())', (t) => {
  const actual = parse(`<div>
    <beep>qux it</beep>
    <beep><bar></bar>it qux</beep>
    <foo>quuux</foo>
  </div>`).querySelectorAll('beep:contains("qux")');
  t.is(actual.length, 2);
  t.is(actual[0].textContent, 'qux it');
  t.is(actual[1].textContent, 'it qux');
});

test('legacy', (t) => {
  const html = tsml`
    <flipp><flopp></flopp></flipp>
    <beep><foo></foo></beep>
  `;
  const actual = legacy(html);
  const expected = parseFragment(html).childNodes;

  t.deepEqual(actual, expected);
});
