const displayItemsReducer = (mItems = [], action) => {
    if (action.type === "DISPLAY_ITEMS_ACTION" && action.items !== undefined) {
        mItems = action.items
    }
    return mItems
}

export default displayItemsReducer;