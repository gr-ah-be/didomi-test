Project Overview
---------------

This is a Node.js project that utilizes the Express framework to create a RESTful API. The project is structured to follow best practices for organization, scalability, and maintainability.

Project Structure
-----------------

The project is divided into the following directories:

* `src`: This directory contains the source code for the application.
	+ `app.ts`: The main application file that sets up the Express server.
	+ `config`: This directory contains configuration files for the application.
		- `logger.ts`: A logger configuration file.
	+ `controllers`: This directory contains controller files that handle incoming requests.
		- `user.controller.ts`: A controller file for user-related endpoints.
		- `consent-event.controller.ts`: A controller file for consent event-related endpoints.
	+ `database`: This directory contains database-related files.
		- `connection.ts`: A file that sets up the database connection.
		- `sequelize-instance-manager.ts`: A file that manages Sequelize instances.
	+ `errors`: This directory contains error files.
		- `database.error.ts`: A file that defines a database error.
		- `validation.error.ts`: A file that defines a validation error.
	+ `models`: This directory contains model files that define the structure of data.
		- `user.model.ts`: A file that defines the user model.
		- `consent-event.model.ts`: A file that defines the consent event model.
	+ `repositories`: This directory contains repository files that encapsulate data access.
		- `user.repository.ts`: A file that defines the user repository.
		- `consent-event.repository.ts`: A file that defines the consent event repository.
	+ `routers`: This directory contains router files that define API endpoints.
		- `user.router.ts`: A file that defines user-related endpoints.
		- `event.router.ts`: A file that defines consent event-related endpoints.
	+ `services`: This directory contains service files that encapsulate business logic.
		- `user.service.ts`: A file that defines the user service.
		- `consent-event.service.ts`: A file that defines the consent event service.
* `test`: This directory contains test files.
	+ `endpoints.test.ts`: A file that tests API endpoints.
	+ `database-test.ts`: A file that tests database-related functionality.

Setup
-----

### Docker Containers

To set up the Docker containers, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Navigate to the project root directory.
3. Run the command `docker-compose up --build -d` to start the containers in detached mode.
4. The containers will be built and started automatically.

### Development Environment

To set up the development environment, follow these steps:

1. Install Node.js and npm on your machine if you haven't already.
2. Navigate to the project root directory.
3. Run the command `npm install` to install dependencies.
4. Run the command `npm run dev` to start the development server. (You might need to copy .env values from the file .env.example)

### Test Environment

To set up the test environment, follow these steps:

1. Install Node.js and npm on your machine if you haven't already.
2. Navigate to the project root directory.
3. Run the command `npm install` to install dependencies.
4. Run the docker test database container with the command `docker-compose up test-db`
5. Run the command `npm run test` to run the tests.

Package.json Scripts
--------------------

The `package.json` file contains several scripts that can be used to perform various tasks:

* `build`: Builds the application using the `tsc` command.
* `start`: Starts the application using the `node` command.
* `test`: Runs the tests using the `jest` command.
* `test:ci`: Runs the tests in CI mode using the `jest` command.
* `lint`: Lints the code using the `eslint` command.
* `lint:fix`: Lints the code and fixes errors using the `eslint` command.
* `dev`: Starts the development server using the `nodemon` command.
