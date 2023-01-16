export async function up(sql) {
  await sql`
  CREATE TABLE countries (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (200) NOT NULL,
    capital VARCHAR (200) NOT NULL,
    population integer NOT NULL,
    gdp_per_capita integer NOT NULL
  )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE countries
  `;
}
