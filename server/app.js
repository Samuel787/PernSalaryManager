
const makeApp = (database) => {
    const express = require("express");
    const bodyParser = require("body-parser")
    const app = express()
    const cors = require("cors")
    const multer = require("multer")
    const Papa = require("papaparse")
    const csvFilter = (req, file, cb) => {
        console.log("This is the file.mimetype: ", file.mimetype)
        if (file.mimetype.includes("csv") || file.mimetype.includes("application/vnd.ms-excel")) {
            cb(null, true);
        } else {
            cb("Please upload only csv file.", false);
        }
    }
    const upload = multer({storage: multer.memoryStorage(), fileFilter: csvFilter});
    const dataVerifier = require("./utils/dataVerifier")
    const storeData = require("./utils/storeData")
    const getRequestVerifier = require("./utils/getRequestVerifier")
    app.use(cors())
    app.use(bodyParser.json())

    // LOCK
    var isUploading = false

    app.get("/users", (req, res) => {
        if (getRequestVerifier(req) == false) {
            res.sendStatus(400)
        } else {
            const minSalary = +req.query.minSalary;
            const maxSalary = +req.query.maxSalary;
            const offset = +req.query.offset;
            const limit = +req.query.limit;
            const sortOrder = req.query.sort.substring(0, 1) === "-" ? "-" : "+";
            const sortBy = req.query.sort.substring(1, req.query.sort.length);
            database.getEmployeeList(minSalary, maxSalary, offset, limit, sortOrder, sortBy)
            .then(result => {
                if (result === null) {
                    console.log("Error in request")
                    res.sendStatus(400)
                } else {
                    let results = []
                    for (const row of result.rows) {
                        let rowObj = {}
                        rowObj["id"] = row["employee_id"]
                        rowObj["name"] = row["employee_name"]
                        rowObj["login"] = row["employee_login"]
                        rowObj["salary"] = row["employee_salary"]
                        results.push(rowObj)
                    }
                    res.send({"results": results})
                }
            })
            .catch(error => {
                console.log("this is the error: ", error)
                res.sendStatus(400)
            })
        }
    })

    app.get("/count", (req, res) => {
        if (getRequestVerifier(req) == false) {
            res.sendStatus(400)
        } else {
            const minSalary = +req.query.minSalary;
            const maxSalary = +req.query.maxSalary;
            const offset = +req.query.offset;
            const limit = +req.query.limit;
            const sortOrder = req.query.sort.substring(0, 1) === "-" ? "-" : "+";
            const sortBy = req.query.sort.substring(1, req.query.sort.length);
            database.getEmployeeList(minSalary, maxSalary, 0, 12000, sortOrder, sortBy)
            .then(result => {
                if (result === null) {
                    console.log("Error in request")
                    res.sendStatus(400)
                } else {
                    res.send({"count": result.rows.length})
                }
            })
            .catch(error => {
                console.log("this is the error: ", error)
                res.sendStatus(400)
            })
        }
    })

    app.get("/numusers", (_, res) => {
        database.getNumEmployees()
        .then(result => {
            res.send({"total": result.rows[0]["count"]})
        })
        .catch(error => {
            console.log("This is the error: ", error);
            res.sendStatus(400)
        })
    })

    app.post("/users/upload", upload.single("file"), (req, res) => {
        if (isUploading) {
            res.sendStatus(400)
            return
        }
        isUploading = true
        const config = {
            header: false,
            comments: "#",
            dynamicTyping: true,
            skipEmptyLines:true,
        };
        const data = Papa.parse(req.file.buffer.toString("utf-8"), config).data;
        dataVerifier(data, database)
        .then(isValid => {
            if (isValid) {
                console.log("Data has been validated. isValid is ", isValid)
                storeData(data, database).then(isSuccess => {
                    if (isSuccess) {
                        isUploading = false
                        res.sendStatus(200)
                    } else {
                        isUploading = false
                        res.sendStatus(400)
                    }
                })
                .catch(err => {
                    isUploading = false
                    console.log("An error has occurred: ", err)
                    res.sendStatus(400)
                });
            } else {
                isUploading = false
                console.log("Data has not been validated. isValid is ", isValid)
                res.sendStatus(400)
            }
        })
        .catch(err => {
            isUploading = false
            console.log("An error has occurred: ", err)
            res.sendStatus(200)
        });
    })

    return app
}  


module.exports = makeApp
