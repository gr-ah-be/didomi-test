const dotenv = require('dotenv');

dotenv.config({
  path: '.env.test',
});

/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  silent: false,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
