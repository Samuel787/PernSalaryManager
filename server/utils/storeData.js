const storeData = async (data, database) => {
    var isFirstRow = true
    var isSuccess = true
    for (const row of data) {
        if (isFirstRow) {
            isFirstRow = false
            continue
        }
        const eId = row[0];
        const eLogin = row[1];
        const eName = row[2];
        const eSalary = row[3];
        // check if eId already exists in the db
        console.log("eId: ", eId)
        try {
            const existingRows = await database.getEmployee(eId)
            if (existingRows.rows.length > 0) {
                database.updateEmployee(eId, eLogin, eName, eSalary)
                .then (result => {
                })
                .catch (err => {
                    console.log("This is the err: ", err)
                    isSuccess = false
                });
            } else {
                database.createEmployee(eId, eLogin, eName, eSalary)
                .then (result => {
                })
                .catch ( err => {
                    console.log("Duplicate: "+ eId + " " + eLogin + " " + eName + " " + eSalary)
                    console.log("This is the err: ", err)
                    isSuccess = false;
                });
            }
        } catch (error) {
            console.log("An error occurred: ", error)
            isSuccess = false;
        }
    }
    return isSuccess
}

module.exports = storeData