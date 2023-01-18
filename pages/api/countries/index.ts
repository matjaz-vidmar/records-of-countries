import type { NextApiRequest, NextApiResponse } from 'next';
import { createCountry, getAllCountries } from '../../../database/countries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // Process a GET request
    const allCountries = await getAllCountries();
    return res.status(200).json(allCountries);
  }
  if (req.method === 'POST') {
    const name = req.body?.name;
    const capital = req.body?.capital;
    const population = req.body?.population;
    const gdpPerCapita = req.body?.gdpPerCapita;

    // Check all the information to create the country
    if (!(name && capital && population && gdpPerCapita)) {
      return res.status(400).json({
        message: 'name, capital, population or GDP per Capita missing',
      });
    }

    // Create the country using the database util function
    const newCountry = await createCountry(
      name,
      capital,
      population,
      gdpPerCapita,
    );

    // response with the new created country
    return res.status(200).json(newCountry);
  }
  return res.status(400).json({ message: 'Method Not Allowed' });
}
