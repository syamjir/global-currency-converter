export function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .slice(0, 2)
    .map((char) => char.charCodeAt(0) + 0x1f1a5);
  return String.fromCodePoint(...codePoints);
}
