export enum BetType {
  single = 'single',
  multi = 'multi',
  season = 'season',
  special = 'special',
  transfer = 'transfer'
}

export namespace BetType {
  export function allTypes() {
    return [
      BetType.multi,
      BetType.single,
      BetType.season,
      BetType.special,
      BetType.transfer
    ];
  }
}
