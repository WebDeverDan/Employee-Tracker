const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const { printTable } = require('console-table-printer');
const addEmployee = require("./utils/inquirerFunctions");
const viewAllEmployees = require("./utils/inquirerFunctions");
const updateEmployeeRole = require("./utils/inquirerFunctions");
const deleteEmployee = require("./utils/inquirerFunctions");
const addRole = require("./utils/inquirerFunctions");
const viewRoles = require("./utils/inquirerFunctions");
const addDepartment = require("./utils/inquirerFunctions");
const viewAllDepartments = require("./utils/inquirerFunctions");
const inquirerFunctions = require("./utils/inquirerFunctions");


// connection to sql with credentials and database
const db = mysql.createConnection({
  host: "localhost",
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
          inquirerFunctions.viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Exit":
          console.log("Good Bye");
      }
    });
}

// to view all employees. ADJUST TO INCLUDE MORE INFORMATION IN THE TABLE
// function viewAllEmployees() {
//   db.query(
//     // for joins, we need the backticks
//     `SELECT employees.id, employees.first_name, employees.last_name, title, salary, dept_name, CONCAT(manager.first_name, " ", manager.last_name) manager 
//   FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
//   LEFT JOIN departments ON roles.department_id = departments.id
//   LEFT JOIN employees manager ON employees.manager_id = manager.id`,
//     function (err, results) {
//       if (err) throw err;
//       printTable(results);
//       startInquirer();
//     }
//   );
// }

// // to add new employee
// function addEmployee() {
//   // this is to select all roles to make them available
//   // for this type of query, we do not need the backticks, just ""
//   db.query("SELECT * FROM roles", function (err, rolesData) {
//     const roles = rolesData.map((roles) => {
//       return {
//         name: roles.title,
//         value: roles.id,
//       };
//     });
//     // this selects all employees to make them available
//     db.query("SELECT * from employees", function (err, employeesData) {
//       const employees = employeesData.map((employees) => {
//         return {
//           name: employees.first_name + " " + employees.last_name,
//           value: employees.id,
//         };
//       });

//       inquirer
//         .prompt([
//           {
//             name: "newEmployeeFirstName",
//             type: "input",
//             message: "What is the first name new employee?",
//           },
//           {
//             name: "newEmployeeLastName",
//             type: "input",
//             message: "What is the last name of the new employee?",
//           },
//           {
//             // allows us to use role instead of id to select the employee role
//             name: "newEmployeeRole",
//             type: "list",
//             message: "What is the new employee's role?",
//             choices: roles,
//           },
//           {
//             // allows us to use the employees' managers name instead of the id
//             name: "newEmployeeManager",
//             type: "list",
//             message: "Who is the manager of the new employee?",
//             choices: employees,
//           },
//         ])

//         .then(function (val) {
//           const firstName = val.newEmployeeFirstName;
//           const lastName = val.newEmployeeLastName;
//           const newEmployeeRole = val.newEmployeeRole;
//           const newEmployeeManager = val.newEmployeeManager;

//           db.query(
//              // to use template literals, we only need the backticks in the queries, not the ""
//             `INSERT INTO employees (first_name, last_name, roles_id , manager_id) VALUES ("${firstName}", "${lastName}", ${newEmployeeRole}, ${newEmployeeManager})`,
//             function (err, results) {
//               // template literal for all of the answers and to put
//               if (err) throw err;
//               console.log("New Employee Successfully Added");
//               startInquirer();
//             }
//           );
//         });
//     });
//   });
// }

// // to update employee role
// function updateEmployeeRole() {
//   db.query("SELECT * FROM employees", function (err, employeesData) {
//     const employees = employeesData.map((employees) => {
//       return {
//         name: employees.first_name + " " + employees.last_name,
//         value: employees.id,
//       };
//     });
//     db.query("SELECT * FROM roles", function (err, rolesData) {
//       const roles = rolesData.map((roles) => {
//         return {
//           name: roles.title,
//           value: roles.id,
//         };
//       });
//     });
//     inquirer
//       .prompt([
//         {
//           name: "updateEmployee",
//           type: "list",
//           message: "Which employee would you like to update?",
//           choices: employees,
//         },
//         {
//           name: "updateEmployeeRole",
//           type: "list",
//           message: "Which employee role would you like to update?",
//           choices: roles,
//         },
//       ])
//       .then(function (response) {
//         db.query(
//           // to use template literals, we only need the backticks in the queries, not the ""
//           `UPDATE employees SET roles_id = ${response.updateEmployeeRole} WHERE id = ${response.updateEmployee}`,
//           function (err, results) {
//             if (err) throw err;
//             console.log("Employee Successfully Updated");
//             startInquirer();
//           }
//         );
//       });
//   });
// }

// // to delete employee
// function deleteEmployee() {
//   db.query("SELECT * from employees", function (err, employeesData) {
//     const employees = employeesData.map((employees) => {
//       return {
//         name: employees.first_name + " " + employees.last_name,
//         value: employees.id,
//       };
//     });
//     inquirer
//       .prompt([
//         {
//           name: "deleteEmployee",
//           type: "list",
//           message: "Which employee would you like to delete?",
//           choices: employees,
//         },
//       ])
//       .then(function (response) {
//         db.query(
//           `DELETE FROM employees WHERE id = ${response.deleteEmployee}`,
//           function (err, results) {
//             if (err) throw err;
//             console.log("Employee Successfully Deleted");
//             startInquirer();
//           }
//         );
//       });
//     });
// }

// // to add role
// function addRole() {
//   db.query("SELECT * FROM departments", function (err, departmentsData) {
//     const departments = departmentsData.map((department) => {
//       return {
//         name: department.dept_name,
//         value: department.id,
//       };
//     });

//     inquirer
//       .prompt([
//         {
//           name: "addRole",
//           type: "input",
//           message: "What is the name of the new role?",
//         },
//         {
//           name: "addRoleSalary",
//           type: "input",
//           message: "What is the salary of the new role?",
//         },
//         {
//           name: "addRoleChoices",
//           type: "list",
//           message: "What department id does the new role have?",
//           choices: departments,
//         },
//       ])
//       .then(function (val) {
//         const addRole = val.addRole;
//         const roleDept = val.addRoleChoices;
//         const roleSalary = val.addRoleSalary;

//         db.query(
//           `INSERT INTO roles (title, salary, department_id) VALUES ("${addRole}", "${roleSalary}", "${roleDept}")`,
//           function (err, results) {
//             // template literal for all of the answers and to put
//             if (err) throw err;
//             console.log("New Role Successfully Added");
//             startInquirer();
//           }
//         );
//       });
//   });
// }

// // view all roles
// function viewRoles() {
//   db.query(
//     `SELECT roles.id, roles.title, salary, dept_name
//   FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`,
//     function (err, results) {
//       if (err) throw err;
//       printTable(results);
//       startInquirer();
//     }
//   );
// }

// // to add department
// function addDepartment() {
//   inquirer
//     .prompt([
//       {
//         name: "addDepartment",
//         type: "input",
//         message: "What is the name of the department?",
//       },
//     ])
//     .then(function (response) {
//       db.query(
//         "INSERT INTO departments(dept_name) VALUES (?)",
//         response.addDepartment,
//         function (err, data) {
//           if (err) throw err;
//           console.log("New Department Successfully Added");
//           startInquirer();
//         }
//       );
//     });
// }

// // to view all departments
// function viewAllDepartments() {
//   db.query("SELECT * FROM departments", function (err, response) {
//     if (err) throw err;
//     printTable(response);
//     startInquirer();
//   });
// }
