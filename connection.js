const mysql = require("mysql2");
require("dotenv").config()

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "imperial_database"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Galactic Imperial Database")
});

module.exports = connection;