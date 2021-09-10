const e = require("express");

const validateData = async (data, database) => {
    if (data.length === 0) {
        return false;
    }
    var isFirstRow = true
    var isValid = true;
    const loginSet = new Set()
    const idSet = new Set()
    for (const row of data) {
        if (isFirstRow) {
            isFirstRow = false
            continue
        }
        if (row.length != 4) {
            isValid = false;
            console.log("The line doesn't have 4 rows")
            break;
        } else {
            const eId = row[0];
            const eLogin = row[1];
            if (loginSet.has(eLogin) || idSet.has(eId)) {
                isValid = false
                console.log("Duplicate logins/eId in input detected")
                break
            } else {
                loginSet.add(eLogin)
                idSet.add(eId)
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
            try {
                const duplicateLoginRecord = await database.getDuplicateLogin(eId, eLogin);
                if (duplicateLoginRecord.rowCount > 0) {
                    isValid = false
                    console.log("Duplicate login detected: ", eLogin)
                    break
                } 
            } catch (error) {
                console.log("An error has occurred: ", error)
            }
        }
    }
    return isValid;
};

module.exports = validateData