const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "imperial_database"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Galactic Imperial Database")
});

module.exports = connection;