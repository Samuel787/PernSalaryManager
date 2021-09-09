const getRequestVerifier = (req) => {
    if (req.query.minSalary === undefined 
        || req.query.maxSalary === undefined 
        || req.query.offset === undefined
        || req.query.limit === undefined
        || req.query.sort === undefined) {
        return false;
    }
    var minSalary = req.query.minSalary;
    minSalary = +minSalary;
    if (isNaN(minSalary)) {
        return false;
    }
    var maxSalary = req.query.maxSalary;
    maxSalary = + maxSalary;
    if (minSalary > maxSalary) {
        return false;
    }
    if (isNaN(maxSalary)) {
        return false;
    }
    var offset = req.query.offset;
    offset = +offset;
    if (isNaN(offset) || offset < 0) {
        return false;
    }
    var limit = req.query.limit;
    limit = +limit;
    if (isNaN(limit) || limit < 0) {
        return false;
    }
    var sortParam = req.query.sort;
    console.log("THis is sortParam: ", sortParam)
    if (sortParam.length == 0 
        || (sortParam.substring(0, 1) !== "+" 
            && sortParam.substring(0, 1) !== "-"
            && sortParam.substring(0, 1) !== " ")
        || (sortParam.substring(1, sortParam.length) !== "id" 
            && sortParam.substring(1, sortParam.length) !== "name"
            && sortParam.substring(1, sortParam.length) !== "login"
            && sortParam.substring(1, sortParam.length) !== "salary")) {
        return false;
    }
    return true;
}

module.exports = getRequestVerifier