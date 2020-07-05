export interface LeaguesGroup {
  country: string;
  leagues: string[];
}

export const leagues: LeaguesGroup[] = [
  {
    country: "Iceland",
    leagues: [
      "Pepsideild (ISL - div. 1)"
    ]
  },
  {
    country: "Norway",
    leagues: [
      "Eliteserien (Nor - div. 1)"
    ]
  },
  {
    country: "Sweden",
    leagues: [
      "Allsvenskan (Swe - div. 1)"
    ]
  }];
