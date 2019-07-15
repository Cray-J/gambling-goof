export enum BetType {
  single = 'single',
  double = 'double',
  multi = 'multi',
  season = 'season'
}

export namespace BetType {
  export function allTypes() {
    return [
      BetType.single,
      BetType.season
    ];
  }
}
