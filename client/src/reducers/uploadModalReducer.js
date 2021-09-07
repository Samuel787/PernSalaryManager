const uploadModalReducer = (isOpen = false, action) => {
    switch (action.type) {
        case "CLOSE_UPLOAD_MODAL":
            return false;
        case "OPEN_UPLOAD_MODAL":
            return true;
        default:
            return false;
    }
}

export default uploadModalReducer;