const express = require("express");
const app = express();
const pool = require("./db");
var fs = require("fs");
const bodyParser = require("body-parser")
const multer = require("multer");
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json())

var Papa = require("papaparse");
const { createEmployee, updateEmployee } = require("./database");

// app.use(upload())
// app.get("/", ) TODO

const csvFilter = (req, file, cb) => {
    console.log("This is the file.mimetype: ", file.mimetype)
    if (file.mimetype.includes("csv") || file.mimetype.includes("application/vnd.ms-excel")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
}

const upload = multer({storage: multer.memoryStorage(), fileFilter: csvFilter});
app.post("/users/upload", upload.single("file"), (req, res) => {
    console.log("This is file: ", req.file)
    const config = {
        header: true,
        comments: "#",
        dynamicTyping: true,
        skipEmptyLines:true,
    };
    const data = Papa.parse(req.file.buffer.toString("utf-8"), ).data;
    validateData(data)
    .then(isValid => {
        if (isValid) {
            console.log("Data has been validated. isValid is ", isValid)
            storeData(data).then(isSuccess => {
                if (isSuccess) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(400)
                }
            })
            .catch(err => {
                console.log("An error has occurred: ", err)
                res.sendStatus(400)
            });
        } else {
            console.log("Data has not been validated. isValid is ", isValid)
            res.sendStatus(400)
        }
    })
    .catch(err => {
        console.log("An error has occurred: ", err)
        res.sendStatus(200)
    });
})

const validateData = async (data) => {
    var isValid = true;
    const loginSet = new Set()
    for (const row of data) {
        if (row.length != 4) {
            isValid = false;
            break;
        } else {
            const eId = row[0];
            const eLogin = row[1];
            if (loginSet.has(eLogin)) {
                isValid = false
                console.log("Duplicate logins in input detected")
                break
            } else {
                loginSet.add(eLogin)
            }
            const eName = row[2];
            var eSalary = row[3];
            // check if eSalary is more than or equal to 0
            eSalary = +eSalary
            if (isNaN(eSalary)) {
                isValid = false
                console.log("salary is not a number")
                break
            }
            if (eSalary < 0) {
                isValid = false
                console.log("Salary value is less than 0")
                break
            }
            // check if the eId already exists in the db
            try {
                const existingRows = await pool.query(`SELECT * FROM employees WHERE employee_id = $1`, [eId])

                if (existingRows.rows.length > 0) {
                    const result = await pool.query(`SELECT * FROM employees WHERE employee_id <> $1 AND employee_login = $2`, [eId, eLogin])
                    if (result.rows.length > 0) {
                        isValid = false
                        console.log("Duplicate login in input & db detected")
                        break
                    } else {
                        // good record
                    }
                } else {
                    // check if the login already exists
                    try {
                        const loginExists = await pool.query(`SELECT * FROM employees WHERE employee_id <> $1 AND employee_login = $2`, [eId, eLogin])
                        if (loginExists.rows.length > 0) {
                            // login already exists. -> fail
                            isValid = false
                            console.log("Duplicate login in input and db detected")
                            break;
                        } else {
                            // can insert this row into the db
                        }
                    } catch (error) {
                        console.log("An error has occurred: ", error)
                    }
                }
            }
            catch (error) {
                console.log("An error has occurred: ", error)
                isValid = false
                break
            }
        }
    }
    return isValid;
};

const storeData = async (data) => {
    isSuccess = true
    for (const row of data) {
        const eId = row[0];
        const eLogin = row[1];
        const eName = row[2];
        const eSalary = row[3];
        // check if eId already exists in the db
        try {
            const existingRows = await pool.query(`SELECT * FROM employees WHERE employee_id = $1`, [eId])
            if (existingRows.rows.length > 0) {
                updateEmployee(eId, eLogin, eName, eSalary)
                .then (result => {
                    if (result.rowCount == 1) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch (err => {
                    console.log("This is the err: ", err)
                    return false
                });
                return true
            } else {
                createEmployee(eId, eLogin, eName, eSalary)
                .then (result => {
                    if (result.rowCount == 1) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch ( err => {
                    console.log("This is the err: ", err)
                    return false;
                });
                return true
            }
        } catch (error) {
            console.log("An error occurred: ", error)
            return false;
        }
    }

}

app.listen(5000, () => {
    console.log("server has started on port 5000")
})