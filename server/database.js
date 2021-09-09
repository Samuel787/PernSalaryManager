const pool = require("./db");

const createEmployee = async (eId, eLogin, eName, eSalary) => {
    const result = await pool.query(
        `INSERT INTO employees (employee_id, employee_login, employee_name, employee_salary)
        VALUES ($1, $2, $3, $4)`, 
        [eId, eLogin, eName, eSalary]
    );
    return result;
}

const updateEmployee = async(eId, eLogin, eName, eSalary) => {
    const result = await pool.query(
        `UPDATE employees 
        SET employee_login = $1,
        employee_name = $2,
        employee_salary = $3
        WHERE employee_id = $4`, 
        [eLogin, eName, eSalary, eId]   
    );
    return result;
}

module.exports = {
    createEmployee, updateEmployee
}