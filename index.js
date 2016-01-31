import parse5 from 'parse5';

export default function (html) {
  return parse5.parseFragment(html);
}
