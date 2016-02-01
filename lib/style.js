import camelcase from 'camelcase-css';

export default ({_attributes: {style}}) => {
  if (!style) {
    return {};
  }

  const results = {};

  style.split(';').forEach(function (row) {
    const [key, value] = row.split(':');
    if (key && value) {
      results[camelcase(key.trim())] = value.trim();      
    }
  });

  return results;
};
