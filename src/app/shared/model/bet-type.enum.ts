export enum BetType {
  botd = 'botd',
  single = 'single',
  extra = 'extra',
  season = 'season'
}

export namespace BetType {

  export function allTypes() {
    return [
      BetType.botd,
      BetType.single,
      BetType.extra,
      BetType.season
    ];
  }

  export function toText(bet: BetType) {
    switch (bet) {
      case BetType.botd:  return 'Bet of the day';
      case BetType.extra: return 'Extra';
      case BetType.season: return 'Seaon';
      case BetType.single: return 'Daily single';
      default: return '';
    }
  }
}
