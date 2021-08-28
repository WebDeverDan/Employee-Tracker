const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// connection to sql with credentials and database
const db = mysql.createConnection({
  host: "localhost",
  // port: 3306,
  user: "root",
  password: "newpassword",
  database: "employee_db",
});
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
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then(function (val) {
      switch (val.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;

        //   add delete employee option

        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          console.log("Good Bye");
      }
    });
}

// to view all employees. ADJUST TO INCLUDE MORE INFORMATION IN THE TABLE
function viewAllEmployees() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    if (err) throw err;
    console.table(results);
    startInquirer();
  });
}
// to add new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "newEmployeeFirstName",
        type: "input",
        message: "What is the first name new employee?",
      },
      {
        name: "newEmployeeLastName",
        type: "input",
        message: "What is the last name of the new employee?",
      },
      {
        name: "newEmployeeRole",
        type: "number",
        message: "What is the role id of the new employee?",
      },
      {
        name: "newEmployeeManager",
        type: "number",
        message: "What is the manager id of the new employee?",
      },
    ])

    .then(function (val) {
      const firstName = val.newEmployeeFirstName;
      const lastName = val.newEmployeeLastName;
      const newEmployeeRole = val.newEmployeeRole;
      const newEmployeeManager = val.newEmployeeManager;

      db.query(
        `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ("${firstName}", "${lastName}", ${newEmployeeRole}, ${newEmployeeManager})`,
        function (err, results) {
          // template literal for all of the answers and to put
          if (err) throw err;
          console.table(val);
          startInquirer();
        }
      );
    });
}

// to update employee role
function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "updateEmployee",
      type: "list",
      message: "Which employee would you like to update?",
      // choices: [what goes here???]
    },
  ]);
}

// to add role
function addRole() {
  inquirer.prompt([
    {
      name: "addRole",
      type: "input",
      message: "What is the name of the new role?",
    },
    {
      name: "addRoleChoices",
      type: "list",
      message: "What department does the new role belong to?",
      choices: ["Sales", "Engineering", "Finance", "Legal", "Service"],
    },
    {
      name: "addRoleSalary",
      type: "input",
      message: "What is the salary of the new role?",
    },
  ]);
}

// to view all departments
function viewAllDepartments() {
  db.query("SELECT * FROM departments", function (err, response) {
    if (err) throw err;
    console.table(response);
    startInquirer();
  });
}

// to add department
function addDepartment() {
  inquirer.prompt([
    {
      name: "addDepartment",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);
}
