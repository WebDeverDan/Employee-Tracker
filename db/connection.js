const mysql = require("mysql2");

// connection to sql with credentials and database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "newpassword",
    database: "employee_db",
  });
  
  module.exports = db;