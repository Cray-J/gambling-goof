export interface LeaguesGroup {
  country: string;
  leagues: string[];
}

export const leagues: LeaguesGroup[] = [
  {
    country: "Iceland",
    leagues: [
      "Pepsideild / Úrvalsdeild (ISL - div.1)",
      "Inkasso-deildin (ISL - div.2)"
    ]
  },
  {
    country: "Norway",
    leagues: [
      "Eliteserien (Nor - div.1)",
      "Obos-ligaen (Nor - div.2)"
    ]
  },
  {
    country: "Sweden",
    leagues: [
      "Allsvenskan (Swe - div.1)",
      "Superettan (Swe - div.2)"
    ]
  },
  {
    country: "USA",
    leagues: [
      "MLS (USA - div.1)"
    ]
  }
];
