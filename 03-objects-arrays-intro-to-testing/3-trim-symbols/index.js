/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const srtArray = string.split('');
  let count = size;
  let result = [];

  if (typeof size === 'undefined') {
    return string;
  }
  if (size === 0 || !string?.trim()) {
    return '';
  }

  srtArray.forEach((symbol, i) => {
    let length = result.length;
    if (length && result[length - 1] !== symbol) {
      count = size;
    }
    if (count !== 0) {
      result.push(symbol);
      count--;
    }
  });

  return result.join('');
}
