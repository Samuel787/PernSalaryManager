const maxSalaryReducer = (maxSalary = 100000000000000, action) => {
    if (action.type === "MAX_SALARY" && action.maxSalary !== undefined) {
        maxSalary = action.maxSalary
    }
    return maxSalary
}

export default maxSalaryReducer