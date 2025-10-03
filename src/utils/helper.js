// Convert a 2-letter country code (e.g. "us") into a flag emoji (e.g. 🇺🇸)
export function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .slice(0, 2)
    .split("")
    .map((char) => char.charCodeAt(0) + 0x1f1a5);

  return String.fromCodePoint(...codePoints);
}
