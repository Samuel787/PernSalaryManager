const maxSalaryAction = (maxSalary = 100000000000000) => {
    return {
        type: "MAX_SALARY",
        maxSalary: maxSalary
    }
}

export default maxSalaryAction