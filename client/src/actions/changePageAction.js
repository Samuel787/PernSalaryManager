const changePageAction = (pageNum = 1) => {
    return {
        type: "CHANGE_PAGE_ACTION",
        page: pageNum
    }
}

export default changePageAction