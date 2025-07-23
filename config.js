const dotenv = require("dotenv");

dotenv.config();

const environment = process.env.ENVIRONMENT || "development";
const isDevelopment = environment === "development";

module.exports = {
  numberOfRequests: process.env.NUMBER_OF_REQUESTS,
  numberOfParallelRequests: process.env.NUMBER_OF_PARALLEL_REQUESTS,
  limit: process.env.LIMIT,
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  environment,
  hostApp: isDevelopment ? `http://localhost:${process.env.PORT}` : process.env.HOST_APP,
};
