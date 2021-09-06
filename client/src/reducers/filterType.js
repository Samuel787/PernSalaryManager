const filterReducer = (filter = 0, action) => {
    switch (action.type) {
        case "ID_ASCENDING":
          return 1;
        case "ID_DESCENDING":
          return 2;
        case "NAME_ASCENDING":
            return 3;
        case "NAME_DESCENDING":
            return 4;
        case "LOGIN_ASCENDING":
            return 5;
        case "LOGIN_DESCENDING":
            return 6;
        case "SALARY_ASCENDING":
            return 7;
        case "SALARY_DESCENDING":
            return 8;
        case "NO_FILTER":
            return 0;
        default:
          return 0;
    }
}

export default filterReducer;