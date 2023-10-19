import { Bookie } from "../shared/model/bookie.enum";

export function transformBookie(bookie: string) {
  switch (bookie) {
    case (Bookie.coolbet):
      return 'CoolBet'
    default:
      return bookie;
  }
}

export function transformOutcome(outcome: string) {
  return `${outcome[0].toUpperCase()}${outcome.substring(1)}`
}
