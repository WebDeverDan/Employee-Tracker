const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require('console-table-printer');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "newpassword",
    database: "employee_db",
  });

module.exports = function viewAllEmployees() {
    db.query(
      // for joins, we need the backticks
      `SELECT employees.id, employees.first_name, employees.last_name, title, salary, dept_name, CONCAT(manager.first_name, " ", manager.last_name) manager 
      FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees manager ON employees.manager_id = manager.id`,
      function (err, results) {
        if (err) throw err;
        printTable(results);
        startInquirer();
      }
    )
};

