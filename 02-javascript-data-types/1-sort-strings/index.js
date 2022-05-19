/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortableFn = (a, b) => {
    const collator = new Intl.Collator('ru', {
      sensitivity: 'case',
      caseFirst: 'upper',
    });
    if (param === 'desc') {
      return collator.compare(b, a);
    }
    return collator.compare(a, b);
  };

  return [...arr].sort(sortableFn);
}
