const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
  "development": {
      "username": process.env.USER_NAME,
      "password": process.env.PASSWORD,
      "database": process.env.DATABASE,
      "host": process.env.HOST,
      "dialect": process.env.DIALECT,
      "port": process.env.DB_PORT
  },
  "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
}