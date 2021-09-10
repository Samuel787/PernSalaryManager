const totalPageCountReducer = (totalPageCount = 1, action) => {
    if (action.type === "TOTAL_PAGE_COUNT_ACTION" && action.totalPageCount != undefined) {
        totalPageCount = action.totalPageCount;
    }
    return totalPageCount
}

export default totalPageCountReducer