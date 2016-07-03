/**
 * @param {Array} tuples an array of object pairs of the form
 *  [{key: 'abc', value: 3}, {key: 'cdf', value: 5}]
 *
 * @returns {Object} an object of the form {abc: 3, cdf: 5}
 */
export function tuplesToObject(tuples) {
  const result = {};
  if (!tuples) { return {}; }
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
  if (!obj) return [];
  return Object.keys(obj).map(key => ({ key, value: obj[key] }));
}

/**
 * Like Promise.all, but operates on a dictionary of the form {key1: promise1, key2: promise2}
 * based on: https://www.promisejs.org/patterns/
 *
 * @param {Object} a dictionary of promises
 * @returns {Promise} a promise of the form {key1: val1, key2: val2}
 */
export function waitForAllKeys(promises) {
  const accumulator = [];
  let ready = Promise.resolve(null);

  objectToTuples(promises).forEach((entry) => {
    const { key, value: promise } = entry;
    ready = ready.then(() => promise).then((res) => {
      accumulator[key] = res;
    });
  });

  return ready.then(() => accumulator);
}

export function localizedIngName(ingredient, loc) {
  if (!ingredient) { return null; }

  let name = ingredient.name;
  if (ingredient.localizations[loc]) {
    name = ingredient.localizations[loc];
  }

  return name;
}
