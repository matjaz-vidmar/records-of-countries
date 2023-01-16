const countries = [
  {
    name: 'Germany',
    capital: 'Berlin',
    population: 85887000,
    gdp_per_capita: 51040,
  },
  {
    name: 'USA',
    capital: 'Washington DC',
    population: 331449281,
    gdp_per_capita: 70430,
  },
  {
    name: 'Austria',
    capital: 'Vienna',
    population: 9050000,
    gdp_per_capita: 51390,
  },
  {
    name: 'China',
    capital: 'Beijing',
    population: 1413659000,
    gdp_per_capita: 11890,
  },
  {
    name: 'Czech Republic',
    capital: 'Prague',
    population: 10527000,
    gdp_per_capita: 21930,
  },
  {
    name: 'Croatia',
    capital: 'Zagreb',
    population: 3823000,
    gdp_per_capita: 14190,
  },
  {
    name: 'Italy',
    capital: 'Rome',
    population: 58983000,
    gdp_per_capita: 35710,
  },
  {
    name: 'Norway',
    capital: 'Oslo',
    population: 5526000,
    gdp_per_capita: 78250,
  },
  {
    name: 'Slovenia',
    capital: 'Ljubljana',
    population: 2109000,
    gdp_per_capita: 25910,
  },
  {
    name: 'Portugal',
    capital: 'Lisbon',
    population: 10296000,
    gdp_per_capita: 22000,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO
      countries ${sql(
        countries,
        'name',
        'capital',
        'population',
        'gdp_per_capita',
      )}

  `;
}
export async function down(sql) {
  for (const country of countries)
    await sql`
    DELETE FROM
      countries
    WHERE
      name = ${country.name} AND
      capital = ${country.capital}
  `;
}
