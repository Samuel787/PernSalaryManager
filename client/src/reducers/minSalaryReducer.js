const minSalaryReducer = (minSalary = 0, action) => {
    if (action.type === "MIN_SALARY" && action.minSalary !== undefined) {
        minSalary = action.minSalary
    }
    return minSalary
}

export default minSalaryReducer