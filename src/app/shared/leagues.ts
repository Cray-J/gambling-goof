export interface LeaguesGroup {
  country: string;
  leagues: string[];
}

export const leagues: LeaguesGroup[] = [
  {
    country: "Australia",
    leagues: [
      "A-League (AUS #1)"
    ]
  },
  {
    country: "England",
    leagues: [
      "Premier League (ENG #1)",
      "FA Cup (ENG)"
    ]
  },
  {
    country: "Iceland",
    leagues: [
      "Pepsideild / Úrvalsdeild (ISL #1)",
      "Inkasso-deildin (ISL #2)",
      "Cup (ISL)"
    ]
  },
  {
    country: "Italy",
    leagues: [
      "Serie A (ITA #1)"
    ]
  },
  {
    country: "Norway",
    leagues: [
      "Eliteserien (Nor #1)",
      "Obos-ligaen (Nor #2)",
      "Postnordligaen (Nor #3)"
    ]
  },
  {
    country: "Sweden",
    leagues: [
      "Allsvenskan (Swe #1)",
      "Superettan (Swe #2)"
    ]
  },
  {
    country: "USA",
    leagues: [
      "MLS (USA #1)"
    ]
  }
];
