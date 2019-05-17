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
    ]
  }
}
