export function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatNumber(num: number) {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatOrdinal(num: number) {
  const ones = num % 10;
  const tens = num % 100;

  if (tens >= 11 && tens <= 13) {
    return `${num}th`;
  }

  switch (ones) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}
