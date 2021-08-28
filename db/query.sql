-- -- FOR ALL EMPLOYEES
-- -- select = columns
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
SELECT * FROM employees;







