const totalPageCountAction = (totalPageCount = 1) => {
    return {
        type: "TOTAL_PAGE_COUNT_ACTION",
        totalPageCount: totalPageCount
    }
}

export default totalPageCountAction