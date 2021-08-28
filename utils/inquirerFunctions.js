const questions = require('./questions');
const inquirer = require('inquirer');
const sql = require('mysql2');

// function to view all employees
function viewAllEmployees() {

    // db.query('SELECT * FROM employees', function (err, results) {
    //     console.log(results);
    //     startPrompt()
    // });
};
// function to add new employee

function addEmployee() {
    // inquirer.prompt(employeeQ).then((answers) => {

    // })
};

// function to update employee role
function updateEmployeeRole() {
};

// funciton to add new role
function addRole() {
};

// function to view all departments
function viewAllDepartments() {
    const query = `SELECT * FROM departments`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

// funtion to add new department
function addDepartment() {
};


module.exports = inquirerFunctions;