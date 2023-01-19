import { css } from '@emotion/react';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { getAllCountries, getCountriesWithLimit } from '../database/countries';
import { indexStyle } from '../styles/index';
import { Country } from '../utils/types';

type Props =
  | {
      countries: undefined;
      errors: { message: string }[];
    }
  | {
      countries: Country[];
    };

export default function Home(props: Props) {
  const [countries, setCountries] = useState<Country[]>(props.countries || []);
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
        population: Number(popInput),
        gdpPerCapita: Number(gdpInput),
      }),
    });
    const countryFromApi = (await response.json()) as Country;
    const newState = [countryFromApi, ...countries];

    setNameInput('');
    setCapitalInput('');
    setPopInput(0);
    setGdpInput(0);
    setCountries(newState);
  }

  async function deleteCountryFromApiById(id: number) {
    const response = await fetch(`/api/countries/${id}`, {
      method: 'DELETE',
    });

    const deletedCountry = (await response.json()) as Country;

    const filteredCountries = countries.filter((country) => {
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
        name: nameOnEditInput,
        capital: capitalOnEditInput,
        population: Number(popOnEditInput),
        gdpPerCapita: Number(gdpOnEditInput),
      }),
    });
    const updatedCountryFromApi = (await response.json()) as Country;

    const newState = countries.map((country) => {
      if (country.id === updatedCountryFromApi.id) {
        return updatedCountryFromApi;
      } else {
        return country;
      }
    });

    setCountries(newState);
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
      <main css={indexStyle.main}>
        <nav css={indexStyle.entryNav}>
          <div>
            <label css={indexStyle.labelStyle}>Name</label>
            <br />
            <input
              css={indexStyle.entryBoxStyle}
              value={nameInput}
              onChange={(event) => {
                setNameInput(event?.currentTarget.value);
              }}
            />
            <br />
            <label css={indexStyle.labelStyle}>Capital</label>
            <br />
            <input
              css={indexStyle.entryBoxStyle}
              value={capitalInput}
              onChange={(event) => {
                setCapitalInput(event?.currentTarget.value);
              }}
            />
            <br />
            <label css={indexStyle.labelStyle}>Population </label>
            <br />
            <input
              css={indexStyle.entryBoxStyle}
              value={popInput}
              type="number"
              onChange={(event) => {
                setPopInput(Number(event?.currentTarget.value));
              }}
            />
            <br />
            <label css={indexStyle.labelStyle}>GDP per Capita</label>

            <br />
            <input
              css={indexStyle.entryBoxStyle}
              value={gdpInput}
              onChange={(event) => {
                setGdpInput(Number(event?.currentTarget.value));
              }}
            />
            <br />
            <button
              css={indexStyle.buttonStyle}
              onClick={async () => {
                await createCountryFromApi();
              }}
            >
              Create Country
            </button>
          </div>
        </nav>

        {countries.map((country) => {
          const isCountryOnEdit = onEditId === country.id;

          return (
            <nav css={indexStyle.entryNavTable}>
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
                  value={
                    isCountryOnEdit ? gdpOnEditInput : country.gdpPerCapita
                  }
                  disabled={!isCountryOnEdit}
                  onChange={(event) => {
                    setGdpOnEditInput(Number(event.currentTarget.value));
                  }}
                />
                <button
                  css={indexStyle.smallButtonStyle}
                  onClick={() => deleteCountryFromApiById(country.id)}
                >
                  X
                </button>

                {!isCountryOnEdit ? (
                  <button
                    css={indexStyle.smallButtonStyle}
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
                    css={indexStyle.smallButtonStyle}
                    onClick={async () => {
                      setOnEditId(undefined);
                      await updateCountryFromApiById(country.id);
                    }}
                  >
                    save
                  </button>
                )}
              </Fragment>

              <br />
            </nav>
          );
        })}
        {countries.length < 6 && (
          <div css={indexStyle.entryNavTable}>
            <button
              css={indexStyle.buttonStyle}
              onClick={() => getCountriesFromApi()}
            >
              show more than 5
            </button>
          </div>
        )}
      </main>
    </>
  );
}
export async function getServerSideProps() {
  const initialCountriesList = await getCountriesWithLimit(5);

  return {
    props: { countries: initialCountriesList },
  };
}
