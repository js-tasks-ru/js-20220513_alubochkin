/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const res = {};
  if (!obj) return;

  for (const [key, value] of Object.entries({ ...obj })) {
    if (!key) return (res = key);
    res[value] = key;
  }

  return res;
}
