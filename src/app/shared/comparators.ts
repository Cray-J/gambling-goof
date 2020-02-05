export function dateComparator() {
  return (a, b) => compare(a.date, b.date);
}

export function nameComparator() {
  return (a, b) => a.name.localeCompare(b.name);
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
