/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const result = [...arr].sort((a, b) => {
    return new Intl.Collator("ru", {
      sensitivity: "case",
      caseFirst: "upper",
    }).compare(a.charAt(0), b.charAt(0));
  });

  if (param === "desc") {
    return result.reverse();
  }
  return result;
}
