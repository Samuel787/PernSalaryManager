const displayItemsAction = (items = []) => {
    return {
        type: "DISPLAY_ITEMS_ACTION",
        items: items
    }
}

export default displayItemsAction