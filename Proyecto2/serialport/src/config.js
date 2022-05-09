const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "34.133.4.117",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
};