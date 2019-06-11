export enum Rating {
  rating_1 = 'rating_1',
  rating_2 = 'rating_2',
  rating_3 = 'rating_3',
}

export namespace Rating {

  export function allTypes() {
    return [
      Rating.rating_1,
      Rating.rating_2,
      Rating.rating_3
    ];
  }

  export function toText(bet: Rating) {
    switch (bet) {
      case Rating.rating_1:  return 'Bet of the day';
      case Rating.rating_2: return '2';
      case Rating.rating_3: return '3';
      default: return '';
    }
  }
}
