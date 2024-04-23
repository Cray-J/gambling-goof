export function transformOutcome(outcome: string) {
  return `${outcome[0].toUpperCase()}${outcome.substring(1)}`
}
