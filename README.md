# Records of Countries

A Next.js app for displaying a list of countries with different characteristics.

## Screenshot

<img src="https://raw.githubusercontent.com/matjaz-vidmar/records-of-countries/main/public/screenshot.png"/>

## Tech stack

- Next.js
- React
- Typescript, Javascript
- Migrations with Ley
- PostgreSQL
- CSS/Emotion
- REST API

## Features

- Initial list of countries
- Each country includes country name, capital, population and GDP per Capita
- User can add a new entry, which shows up at the top of the list
- User can delete an entry by clicking X or edit the entry by clicking edit
- Pagination: by clicking show more than 5, the user can view more than 5 entries

## API Design

/api/

/api/countries/
GET
POST

/api/countries/:ID
GET
PUT
DELETE

## Database Setup

- Create a user and a database
- Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.
- Use your newly created username, password and the name of the database to replace the placeholders #####
- Run yarn add dotenv-cli
- Run the migrations with yarn migrate up
- Start the server by running yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
