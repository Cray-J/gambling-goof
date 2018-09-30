export function betDateComparator() {
  return (a, b) => compare(a.date, b.date);
}

function compare(a: Date, b: Date) {
  if (a > b) {
    return -1;
  }

  if (a < b) {
    return 1;
  }

  return 0;
}
