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

const getEmployee = async(eId) => {
    const result = await pool.query(
        `SELECT * FROM employees WHERE employee_id = $1`, [eId]
    );
    return result;
}

const getDuplicateLogin = async(eId, eLogin) => {
    const result = await pool.query(
        `SELECT * FROM employees 
        WHERE employee_id <> $1 
        AND employee_login = $2`,
        [eId, eLogin]
    );
    return result;
}

const getEmployeeList = async(minSalary, maxSalary, offset, limit, sortOrder, sortBy) => {
    var orderColumnName;
    switch (sortBy) {
        case "id":
            orderColumnName = "employee_id";
            break;
        case "name":
            orderColumnName = "employee_name";
            break;
        case "login":
            orderColumnName = "employee_login";
            break;
        case "salary":
            orderColumnName = "employee_salary";
            break;
        default:
            orderColumnName = "table_id";
            break;
    }
    try {
        if (sortOrder === "-") {
            const result = await pool.query(
                `SELECT * FROM employees
                 WHERE employee_salary >= $1 AND employee_salary <= $2
                 ORDER BY $3 DESC
                 LIMIT $5 OFFSET $6`,
                 [minSalary, maxSalary, orderColumnName, limit, offset]
            );
            return result;
        } else {
            const result = await pool.query(
                `SELECT * FROM employees
                 WHERE employee_salary >= $1 AND employee_salary <= $2
                 ORDER BY $3 ASC
                 LIMIT $4 OFFSET $5`,
                 [minSalary, maxSalary, orderColumnName, limit, offset]
            );
            return result;
        }
    } catch (error) {
        console.log("Error occurred in database call: ", error)
        return null;
    }
}

module.exports = {
    createEmployee,
    updateEmployee,
    getEmployee,
    getDuplicateLogin,
    getEmployeeList
}