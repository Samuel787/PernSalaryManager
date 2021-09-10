import filterReducer from "./filterType";
import uploadModalReducer from "./uploadModalReducer";
import { combineReducers } from "redux";
import { changePageReducer } from "./changePageReducer";
import displayItemsReducer from "./displayItemsReducer";
import maxSalaryReducer from "./maxSalaryReducer";
import minSalaryReducer from "./minSalaryReducer";
import totalPageCountReducer from "./totalPageCountReducer";

const rootReducers = combineReducers({
    filter: filterReducer,
    isModalOpen: uploadModalReducer,
    currPage: changePageReducer,
    displayItems: displayItemsReducer,
    minSalary: minSalaryReducer,
    maxSalary: maxSalaryReducer,
    totalPageCount: totalPageCountReducer
})

export default rootReducers;