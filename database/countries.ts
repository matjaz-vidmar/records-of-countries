import { Country } from '../utils/types';
import { sql } from './connect';

export async function getAllCountries() {
  const allCountries = await sql<Country[]>`
    SELECT * FROM countries;
  `;
  return allCountries;
}

// Get a single country by id

export async function getCountryById(id: number) {
  const [country] = await sql<Country[]>`
    SELECT
      *
    FROM
      countries
    WHERE
      countries.id = ${id}
  `;
  return country;
}
// Creating a new entry for a country
export async function createCountry(
  name: string,
  capital: string,
  population: number,
  gdpPerCapita: number,
) {
  const [country] = await sql<Country[]>`
      INSERT INTO countries
        (name, capital, population, gdp_per_capita)
      VALUES
        (${name}, ${capital}, ${population}, ${gdpPerCapita})
      RETURNING *
    `;
  // Getting the new entry for a country

  return country;
}
export async function updateCountryById(
  id: number,
  name: string,
  capital: string,
  population: number,
  gdpPerCapita: number,
) {
  const [country] = await sql<Country[]>`
    UPDATE
      countries
    SET
      name = ${name},
      capital = ${capital},
      population = ${population},
      gdp_per_capita = ${gdpPerCapita}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return country;
}
// Delete a single country
export async function deleteCountryById(id: number) {
  const [country] = await sql<Country[]>`
    DELETE FROM
      countries
    WHERE id = ${id}
    RETURNING *
  `;
  return country;
}
// Get all countries limiting the number of results
export async function getCountriesWithLimit(limit: number) {
  const countries = await sql<Country[]>`
    SELECT
      *
    FROM
      countries
    LIMIT ${limit}
  `;
  return countries;
}
