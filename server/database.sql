CREATE DATABASE employee_manager WITH ENCODING = UTF8;

CREATE TABLE employees(
    table_id SERIAL PRIMARY KEY,
    employee_id VARCHAR(255) UNIQUE NOT NULL,
    employee_login VARCHAR(255) UNIQUE NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    employee_salary REAL NOT  NULL CHECK (employee_salary >= 0)
);