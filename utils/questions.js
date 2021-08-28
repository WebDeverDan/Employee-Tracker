const menuQ = [
  {
      name: "mainMenu",
      type:   "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "Add Role", "View All Departments", "Add Department", "Exit"]
    }
];

const employeeQ = [
{ 
  name: "newEmployeeFirstName",
  type: "input",
  message: "What is the first name new employee?",
},
{ 
  name: "newEmployeeLastName",
  type: "input",
  message: "What is the last name new employee?",
},
{ 
  name: "newEmployeeRole",
  type: "list",
  message: "What is the role of the new employee?",
  choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Customer Service"]
},
{ 
  name: "newEmployeeManager",
  type: "list",
  message: "Who is the manager of the new employee?",
  choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown"]
},
];

const newRoleQ = [
  { 
      name: "addRole",
      type: "input",
      message: "What is the name of the new role?",
    },
    {
      name: "addRoleChoices",
      type:   "list",
      message: "What department does the new role belong to?",
      choices: ["Sales", "Engineering", "Finance", "Legal", "Service"]
    },
    { 
      name: "addRoleSalary",
      type: "input",
      message: "What is the salary of the new role?",
    },
];

const newDepartmentQ = [
  { 
      name: "addDepartment",
      type: "input",
      message: "What is the name of the department?",
    },
];

const updateEmployeeRoleQ = [
  { 
      name: "updateEmployee",
      type: "list",
      message: "Which employee would you like to update?",
      choices: []
    }
]; 

module.exports = questions;