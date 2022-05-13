/**
 * sum
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */
export default function sum(m, n) {
  m = parseInt(m);
  n = parseInt(n);
  if (isNaN(m) || isNaN(n)) {
    throw new Error(`parameters cannot be reduced to a number`);
  }

  if (typeof m === "number" && typeof n === "number") {
    return Number(m) + Number(n);
  }
}
