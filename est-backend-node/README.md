# Employee Skills Tracker API

This is the backend API for the Employee Skills Tracker, which allows you to manage employee information and their skills.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

I used the following technologies to build this project:

- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose
- Jest

## Installation

I used Yarn when building the project but you may use yarn or any other package manager you prefer.

1. Clone the repository:

   ```bash
   git clone https://github.com/sletlape/est-backend-node.git
   cd est-backend-node
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the project.
   - Add your MongoDB connection URI as `MONGODB_URI`.
   - You can also specify the `PORT` for the server. The default is 3000.

   Example `.env` file:

   ```env
   MONGODB_URI=mongodb://localhost:27017/employee-skills-db
   PORT=3000
   ```

4. Build the TypeScript code:

   ```bash
   yarn run build
   ```

## Usage

Set the following environment variables:
  - `MONGODB_URI` - URI to connect to MongoDB
  - `PORT` - Port for the server to run on (default is 3000)
  - API will be available at http://localhost:3000

Start the server:

```bash
yarn start
```

Start the development server:
```bash
yarn dev
```

The server will start on the port specified in your `.env` file (default is 3000).

You can now make API requests to `http://localhost:3000/api/v1/employees` (or the specified port) to manage employee data.

## API Documentation


### API Endpoints Overview

- GET `/employees` - Get all employees
- POST `/employees` - Create a new employee
- GET `/employees/:id` - Get employee by ID
- PUT `/employees/:id` - Update employee by ID
- DELETE `/employees/:id` - Delete employee by ID

You can find the API documentation in the `swagger.yml` file included in the project. You can use Swagger UI or other tools to visualize and interact with the API documentation.

To view the API documentation, you can run a Swagger UI instance using Docker or use online tools like the [Swagger Editor](https://editor.swagger.io/).

## Testing

To run tests, use the following command:

```bash
yarn test
```

This will execute Jest tests in the `tests` directory.

*Note: I used the same DB for testing and main project. This makes it easier to populate the table quickly but is not recommended for production code.*

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as you see fit.
