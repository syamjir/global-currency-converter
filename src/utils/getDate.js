// Format a given date as "YYYY-MM-DD", defaulting to "2024-08-31"
export function getDate(date = new Date("2024/08/31")) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
