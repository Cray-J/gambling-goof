export enum Bookie {
  bet365 = 'bet365',
  betfair = 'betfair',
  coolbet = 'coolBet',
  nordicBet = 'nordicBet',
  unibet = 'unibet',
  paddyPower = 'paddyPower',
  pinnacle = 'pinnacle'
}

export namespace Bookie {
  export function allBookies() {
    return [
      Bookie.bet365,
      Bookie.betfair,
      Bookie.coolbet,
      Bookie.nordicBet,
      Bookie.unibet,
      Bookie.paddyPower,
      Bookie.pinnacle
    ];
  }

  export function toText(bookie: Bookie) {
    switch (bookie) {
      case Bookie.bet365: return 'Bet365';
      case Bookie.betfair: return 'Betfair';
      case Bookie.coolbet: return 'Coolbet';
      case Bookie.nordicBet: return 'Nordicbet';
      case Bookie.unibet: return 'Unibet';
      case Bookie.paddyPower: return 'PaddyPower';
      case Bookie.pinnacle: return 'Pinnacle';
      default: return '';
    }
  }
}
