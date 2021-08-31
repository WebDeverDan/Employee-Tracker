const inquirer = require("inquirer");

const cTable = require("console.table");
const { printTable } = require("console-table-printer");
const { addEmployee } = require("./utils/inquirerFunctions");
const { viewAllEmployees } = require("./utils/inquirerFunctions");
const { updateEmployeeRole } = require("./utils/inquirerFunctions");
const { deleteEmployee } = require("./utils/inquirerFunctions");
const { addRole } = require("./utils/inquirerFunctions");
const { viewRoles } = require("./utils/inquirerFunctions");
const { addDepartment } = require("./utils/inquirerFunctions");
const { viewAllDepartments } = require("./utils/inquirerFunctions");
const db = require("./db/connection");

// connection success and starting prompt
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the employee_db database.");
  startInquirer();
});

// startprompt will start the inquirer. the questions will change based on a switch case
function startInquirer() {
  return inquirer
    .prompt([
      {
        name: "mainMenu",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          // "View All Employees by Department",
          "Add Employee",
          "Update Employee Role",
          "Delete Employee",
          "Add Role",
          "View All Roles",
          "Add Department",
          "View All Departments",
          "Exit",
        ],
      },
    ])

    .then(function (val) {
      switch (val.mainMenu) {
        case "View All Employees":
          viewAllEmployees().then((results) => {
            printTable(results);
            startInquirer();
          });
          break;
        case "Add Employee":
          addEmployee().then((results) => {
            console.log("New Employee Successfully Added");
            startInquirer();
          });
          break;
        case "Update Employee Role":
          updateEmployeeRole().then((results) => {
            console.log("Employee Role Successfully Added");
            startInquirer();
          });
          break;
        case "Delete Employee":
          deleteEmployee().then((results) => {
            console.log("Employee Successfully Deleted");
            startInquirer();
          });
          break;
        case "Add Role":
          addRole().then((results) => {
            console.log("Role Successfully Added");
            startInquirer();
          });
          break;
        case "View All Roles":
          viewRoles().then((results) => {
            printTable(results);
            startInquirer();
          });
          break;
        case "Add Department":
          addDepartment().then((results) => {
            console.log("Department Successfully Added");
            startInquirer();
          });
          break;
        case "View All Departments":
          viewAllDepartments().then((results) => {
            printTable(results);
            startInquirer();
          });
          break;
        case "Exit":
          console.log("Good Bye");
      }
    });
}
