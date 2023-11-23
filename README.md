# Express.js CRUD Project with Sequelize and PostgreSQL

This is a basic Express.js project showcasing CRUD (Create, Read, Update, Delete) operations using Sequelize with PostgreSQL as the database.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

 Clone this repository:

   ```bash
   git clone https://github.com/prashantjoshi12/express-sequelize-postgresql-crud

   ```


3. Install dependencies:

   ```bash
   npm install

   ```

4. Create a .env file in the project root with your PostgreSQL database configuration:
   ```bash
   PORT=3000
   DATABASE_NAME=your_database_name
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   DATABASE_HOST=localhost
   ```

Replace your_database_name, your_database_user, your_database_password, and localhost with your actual database details.

5. Run database migrations to create tables:
   ```bash
   npx sequelize db:migrate

   ```
6. Start the server:
   ```bash
   npm start
   ```
