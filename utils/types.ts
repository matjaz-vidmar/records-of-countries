export type Country = {
  id: number;
  name: string;
  capital: string;
  population: number;
  gdpPerCapita: number;
};
// possible types for the response data from the API
// export type Data =
//   | {
//       error: string;
//     }
//   | {
//       country: Country;
//     }
//   | {
//       countries: Country[];
//     }
//   | {
//       message: string;
//     };
