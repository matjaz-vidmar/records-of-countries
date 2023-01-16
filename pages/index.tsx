import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import {
  getAllCountries,
  getCountriesWithLimit,
  getCountryById,
} from '../database/countries';
import { Country } from '../utils/types';

type Props = {
  countries: Country[];
  errors: { message: string }[];
};

export default function Home(props: Props) {
  const [countries, setCountries] = useState(props.countries || []);
  const [nameInput, setNameInput] = useState('');
  const [capitalInput, setCapitalInput] = useState('');
  const [popInput, setPopInput] = useState<number | undefined>();
  const [gdpInput, setGdpInput] = useState<number | undefined>();
  const [nameOnEditInput, setNameOnEditInput] = useState('');
  const [capitalOnEditInput, setCapitalOnEditInput] = useState('');
  const [popOnEditInput, setPopOnEditInput] = useState<number | undefined>();
  const [gdpOnEditInput, setGdpOnEditInput] = useState<number | undefined>();
  const [onEditId, setOnEditId] = useState<number | undefined>();

  if ('errors' in props) {
    return (
      <div>
        {props.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  async function getCountriesFromApi() {
    const response = await fetch('/api/countries');
    const countriesFromApi = await response.json();

    setCountries(countriesFromApi);
  }

  async function createCountryFromApi() {
    const response = await fetch('/api/countries', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput,
        capital: capitalInput,
        population: popInput,
        gdpPerCapita: gdpInput,
      }),
    });
    const countryFromApi = (await response.json()) as Country;
    const newState = [...props.countries, countryFromApi];

    setCountries(newState);
  }

  async function deleteCountryFromApiById(id: number) {
    const response = await fetch(`/api/countries/${id}`, {
      method: 'DELETE',
    });

    const deletedCountry = (await response.json()) as Country;

    const filteredCountries = props.countries.filter((country) => {
      return country.id !== deletedCountry.id;
    });

    setCountries(filteredCountries);
  }

  async function updateCountryFromApiById(id: number) {
    const response = await fetch(`/api/countries/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput,
        capital: capitalInput,
        population: popInput,
        gdpPerCapita: gdpInput,
      }),
    });
    const updatedCountryFromApi = (await response.json()) as Country;

    const newState = props.countries.map((country) => {
      if (country.id === updatedCountryFromApi.id) {
        return updatedCountryFromApi;
      } else {
        return country;
      }
    });

    setCountries(newState);
  }
  useEffect(() => {
    getCountriesFromApi().catch((err) => {
      console.log(err);
    });
  }, []);
  if ('errors' in props) {
    return (
      <div>
        {props.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>List of Countries</title>
        <meta
          name="description"
          content="A list of countries with various data entries"
        />
      </Head>
      <div>Records of countries</div>
      <label>
        Name
        <br />
        <input
          value={nameInput}
          onChange={(event) => {
            setNameInput(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Capital
        <br />
        <input
          value={capitalInput}
          onChange={(event) => {
            setCapitalInput(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Population
        <br />
        <input
          value={popInput}
          type="number"
          onChange={(event) => {
            setPopInput(Number(event.currentTarget.value));
          }}
        />
      </label>
      <br />
      <label>
        GDP per Capita
        <br />
        <input
          value={gdpInput}
          onChange={(event) => {
            setGdpInput(Number(event.currentTarget.value));
          }}
        />
      </label>
      <button
        onClick={async () => {
          await createCountryFromApi();
        }}
      >
        Create Country
      </button>
      <hr />
      {props.countries.map((country) => {
        const isCountryOnEdit = onEditId === country.id;

        return (
          <Fragment key={country.id}>
            <input
              value={isCountryOnEdit ? nameOnEditInput : country.name}
              disabled={!isCountryOnEdit}
              onChange={(event) => {
                setNameOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={isCountryOnEdit ? capitalOnEditInput : country.capital}
              disabled={!isCountryOnEdit}
              onChange={(event) => {
                setCapitalOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={isCountryOnEdit ? popOnEditInput : country.population}
              disabled={!isCountryOnEdit}
              onChange={(event) => {
                setPopOnEditInput(Number(event.currentTarget.value));
              }}
            />
            <input
              value={isCountryOnEdit ? gdpOnEditInput : country.gdpPerCapita}
              disabled={!isCountryOnEdit}
              onChange={(event) => {
                setGdpOnEditInput(Number(event.currentTarget.value));
              }}
            />
            <button onClick={() => deleteCountryFromApiById(country.id)}>
              X
            </button>
            {!isCountryOnEdit ? (
              <button
                onClick={() => {
                  setOnEditId(country.id);
                  setNameOnEditInput(country.name);
                  setCapitalOnEditInput(country.capital);
                  setPopOnEditInput(country.population);
                  setGdpOnEditInput(country.gdpPerCapita);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  setOnEditId(undefined);
                  await updateCountryFromApiById(country.id);
                }}
              >
                save
              </button>
            )}
            <br />
          </Fragment>
        );
      })}
      {countries.length < 6 && (
        <button onClick={() => getCountriesFromApi()}>show more than 5</button>
      )}
    </>
  );
}
export async function getServerSideProps() {
  //const initialCountriesList = await getCountriesWithLimit(5);
  const countries = await getAllCountries();
  // if (!countries) {
  //   return {
  //     props: {
  //       countries: [],
  //     },
  //   };
  // }
  return {
    props: { countries },
  };
}
