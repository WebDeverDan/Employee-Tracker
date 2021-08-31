const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const db = require("../db/connection");
const { promisify } = require("util");
db.query = promisify(db.query);


function viewAllEmployees() {
  return db.query(
    // for joins, we need the backticks
    `SELECT employees.id, employees.first_name, employees.last_name, title, salary, dept_name, CONCAT(manager.first_name, " ", manager.last_name) manager 
    FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id`
  );
}

// to add new employee
function addEmployee() {
  // this is to select all roles to make them available
  // for this type of query, we do not need the backticks, just ""
  return db.query("SELECT * FROM roles").then((rolesData) => {
    const roles = rolesData.map((roles) => {
      return {
        name: roles.title,
        value: roles.id,
      };
    });
    // this selects all employees to make them available
    return db.query("SELECT * from employees").then((employeesData) => {
      const employees = employeesData.map((employees) => {
        return {
          name: employees.first_name + " " + employees.last_name,
          value: employees.id,
        };
      });
      return inquirer
        .prompt([])

        .then(function (val) {
          const firstName = val.newEmployeeFirstName;
          const lastName = val.newEmployeeLastName;
          const newEmployeeRole = val.newEmployeeRole;
          const newEmployeeManager = val.newEmployeeManager;

          return db.query(
            // to use template literals, we only need the backticks in the queries, not the ""
            `INSERT INTO employees (first_name, last_name, roles_id , manager_id) VALUES ("${firstName}", "${lastName}", ${newEmployeeRole}, ${newEmployeeManager})`
          );
        });
    });
  });
}

// to update employee role
function updateEmployeeRole() {
  return db.query("SELECT * FROM employees").then((employeesData) => {
    const employees = employeesData.map((employees) => {
      return {
        name: employees.first_name + " " + employees.last_name,
        value: employees.id,
      };
    });
    return db.query("SELECT * FROM roles").then((rolesData) => {
      const roles = rolesData.map((roles) => {
        return {
          name: roles.title,
          value: roles.id,
        };
      });
      return inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees,
          },
          {
            name: "updateEmployeeRole",
            type: "list",
            message: "Which employee role would you like to update?",
            choices: roles,
          },
        ])
        .then(function (response) {
          return db.query(
            // to use template literals, we only need the backticks in the queries, not the ""
            `UPDATE employees SET roles_id = ${response.updateEmployeeRole} WHERE id = ${response.updateEmployee}`
          );
        });
    });
  });
}

// to delete employee
function deleteEmployee() {
  return db.query("SELECT * from employees").then((employeesData) => {
    const employees = employeesData.map((employees) => {
      return {
        name: employees.first_name + " " + employees.last_name,
        value: employees.id,
      };
    });
    return inquirer
      .prompt([
        {
          name: "deleteEmployee",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: employees,
        },
      ])
      .then(function (response) {
        return db.query(
          `DELETE FROM employees WHERE id = ${response.deleteEmployee}`
        );
      });
  });
}

// to add role
function addRole() {
  return db.query("SELECT * FROM departments").then((departmentsData) => {
    const departments = departmentsData.map((department) => {
      return {
        name: department.dept_name,
        value: department.id,
      };
    });
    return inquirer
      .prompt([
        {
          name: "addRole",
          type: "input",
          message: "What is the name of the new role?",
        },
        {
          name: "addRoleSalary",
          type: "input",
          message: "What is the salary of the new role?",
        },
        {
          name: "addRoleChoices",
          type: "list",
          message: "What department id does the new role have?",
          choices: departments,
        },
      ])
      .then(function (val) {
        const addRole = val.addRole;
        const roleDept = val.addRoleChoices;
        const roleSalary = val.addRoleSalary;

        return db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ("${addRole}", "${roleSalary}", "${roleDept}")`
        );
      });
  });
}

// view all roles
function viewRoles() {
  return db.query(
    `SELECT roles.id, roles.title, salary, dept_name
    FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`
  );
}

// to add department
function addDepartment() {
  return inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(function (response) {
      return db.query(
        "INSERT INTO departments(dept_name) VALUES (?)",
        response.addDepartment,
        function (err, data) {
          if (err) throw err;
          console.log("New Department Successfully Added");
          startInquirer();
        }
      );
    });
}

// to view all departments
function viewAllDepartments() {
  return db.query("SELECT * FROM departments");
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
  addRole,
  viewRoles,
  addDepartment,
  viewAllDepartments,
};
