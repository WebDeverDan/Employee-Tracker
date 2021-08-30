-- -- FOR ALL EMPLOYEES
-- -- -- select = columns
-- SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.roles_id, employee.manager_id, department.dept_name

-- FROM department
-- JOIN roles ON roles.department_id = department.id
-- JOIN employee ON employee.roles_id = roles.id


-- insert new employee
-- INSERT INTO employee (first_name, last_name, roles_id, manager_id )
--   VALUES ();

USE employee_db;

SELECT * FROM departments;
SELECT * FROM roles;
SELECT employees.id, employees.first_name, employees.last_name, title, salary, dept_name, CONCAT(manager.first_name, " ", manager.last_name) manager 
FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON employees.manager_id = manager.id;


SELECT roles.id, roles.title, salary, dept_name
FROM roles LEFT JOIN departments ON roles.department_id = departments.id;


SELECT employees.id, employees.first_name, employees.last_name, title, dept_name, salary
FROM employees LEFT JOIN roles ON employees.roles_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id








