export interface LeaguesGroup {
  country: string;
  leagues: string[];
}

export const leagues: LeaguesGroup[] = [
  {
    country: "Norway",
    leagues: [
      "Eliteserien (Nor)"
    ]
  },
  {
    country: "Sweden",
    leagues: [
      "Allsvenskan (Swe)"
    ]
  }];
