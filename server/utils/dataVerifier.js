const e = require("express");

const validateData = async (data, database) => {
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
            try {
                const duplicateLoginRecord = await database.getDuplicateLogin(eId, eLogin);
                if (duplicateLoginRecord.rowCount > 0) {
                    isValid = false
                    console.log("Duplicate login detected")
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