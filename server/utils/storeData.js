const storeData = async (data, database) => {
    isSuccess = true
    for (const row of data) {
        const eId = row[0];
        const eLogin = row[1];
        const eName = row[2];
        const eSalary = row[3];
        // check if eId already exists in the db
        try {
            const existingRows = await database.getEmployee(eId)
            if (existingRows.rows.length > 0) {
                database.updateEmployee(eId, eLogin, eName, eSalary)
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
                database.createEmployee(eId, eLogin, eName, eSalary)
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

module.exports = storeData