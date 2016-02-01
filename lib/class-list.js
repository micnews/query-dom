import Set from 'es6-set';

export default ({_attributes}) => {
  const className = (_attributes['class'] || '').trim();

  if (!className) {
    return {
      contains: () => false
    };
  }

  const classes = new Set(
    className.split(' ').filter(Boolean)
  );

  return {
    contains: (name) => classes.has(name)
  };
};
