const filterReducer = (filter = 0, action) => {
    if (action.type === "FILTER_MODE_ACTION" && action.filterMode !== undefined) {
        filter = action.filterMode
    }
    return filter
}

export default filterReducer;