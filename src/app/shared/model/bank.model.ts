import { Bookie } from './bookie.enum';

export class Bank {
  public bookies: Map<Bookie, number> = new Map()
    .set(Bookie.bet365, 3100)
    .set(Bookie.betfair, 2000)
    .set(Bookie.coolbet, 2000)
    .set(Bookie.unibet, 0)
    .set(Bookie.nordicBet, 2000);
}
