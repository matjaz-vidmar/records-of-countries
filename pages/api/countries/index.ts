import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createCountry,
  deleteCountryById,
  getAllCountries,
  updateCountryById,
} from '../../../database/countries';
import { Country } from '../../../utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const countryId = Number(req.query.id);
  // if (!countryId) {
  //   return res.status(404).json({ message: 'Not a valid id' });
  // }
  if (req.method === 'GET') {
    // Process a GET request
    const allCountries = await getAllCountries();
    res.status(200).json({ countries: allCountries });
  }
  if (req.method === 'POST') {
    // const countryId = req.body?.countryId;
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
  // if (req.method === 'PATCH') {
  //   // NOT getting the id from the body since is already on the query
  //   const name = req.body?.name;
  //   const capital = req.body?.capital;
  //   const population = req.body?.population;
  //   const gdpPerCapita = req.body?.gdpPerCapita;

  //   // Check all the information to create the country exists
  //   if (!(name && capital && population && gdpPerCapita)) {
  //     return res.status(400).json({
  //       message: 'name, capital, population or GDP per Capita missing',
  //     });
  //   }

  //   // Create the country using the database util function
  //   const updatedCountry = await updateCountryById(
  //     countryId,
  //     name,
  //     capital,
  //     population,
  //     gdpPerCapita,
  //   );

  //   if (!updatedCountry) {
  //     return res.status(404).json({ message: 'Not a valid Id' });
  //   }

  //   // response with the newly created country
  //   return res.status(200).json(updatedCountry);
  // }
  // if (req.method === 'DELETE') {
  //   const deletedCountry = await deleteCountryById(countryId);

  //   if (!deletedCountry) {
  //     return res.status(404).json({ message: 'Not a valid Id' });
  //   }

  //   console.log(deletedCountry);

  //   return res.status(200).json(deletedCountry);
  // }
  return res.status(400).json({ message: 'Method Not Allowed' });
}
