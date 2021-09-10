const minSalaryAction = (minSalary = 0) => {
    return {
        type: "MIN_SALARY",
        minSalary: minSalary,
    }
}

export default minSalaryAction