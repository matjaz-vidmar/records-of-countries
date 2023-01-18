import type { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteCountryById,
  getCountryById,
  updateCountryById,
} from '../../../database/countries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const countryId = Number(req.query.countryId);

  // check if the id is a number
  if (!countryId) {
    return res.status(404).json({ message: 'Not a valid id' });
  }
  if (req.method === 'GET') {
    const country = await getCountryById(countryId);

    // check if the country exists on the database
    if (!country) {
      return res.status(404).json({ message: 'Not a valid id' });
    }

    return res.status(200).json(country);
  }
  if (req.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
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

    // Create the animal using the database util function
    const newCountry = await updateCountryById(
      countryId,
      name,
      capital,
      population,
      gdpPerCapita,
    );

    if (!newCountry) {
      return res.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the newly created country
    return res.status(200).json(newCountry);
  }

  if (req.method === 'DELETE') {
    const deletedCountry = await deleteCountryById(countryId);

    if (!deletedCountry) {
      return res.status(404).json({ message: 'Not a valid Id' });
    }

    return res.status(200).json(deletedCountry);
  }

  return res.status(400).json({ message: 'Method Not Allowed' });
}
