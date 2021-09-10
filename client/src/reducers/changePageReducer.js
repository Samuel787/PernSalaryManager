export const changePageReducer = (currentPage = 1, action) => {
    if (action.type === "CHANGE_PAGE_ACTION" && action.page !== undefined) {
        if (action.page > 0) {
            currentPage = action.page
        } else {
            currentPage = 1
        }
    }
    return currentPage
}