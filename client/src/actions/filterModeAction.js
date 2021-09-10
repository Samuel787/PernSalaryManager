const filterModeAction = (filterMode = 0) => {
    return {
        type: "FILTER_MODE_ACTION",
        filterMode: filterMode
    };
};

export default filterModeAction