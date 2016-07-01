/**
 * @param {Array} tuples an array of object pairs of the form
 *  [{key: 'abc', value: 3}, {key: 'cdf', value: 5}]
 *
 * @returns {Object} an object of the form {abc: 3, cdf: 5}
 */
export function tuplesToObject(tuples) {
  const result = {};
  for (const entry of tuples) {
    const { key, value } = entry;
    result[key] = value;
  }

  return result;
}


/**
 * @param {Object} obj an object of the form {abc: 3, cdf: 5}
 * @returns {Array} [{key: 'abc', value: 3}, {key: 'cdf', value: 5}]
 */
export function objectToTuples(obj) {
  return Object.keys(obj).map(key => ({ key, value: obj[key] }));
}
