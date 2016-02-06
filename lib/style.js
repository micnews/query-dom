import camelcase from 'camelcase-css';

export default (style) => {
  if (!style) {
    return {};
  }

  const results = {};

  style.split(';').forEach(row => {
    const index = row.indexOf(':');
    const key = row.slice(0, index).trim();
    const value = row.slice(index + 1).trim();

    if (key && value) {
      results[camelcase(key)] = value;
    }
  });

  return results;
};
