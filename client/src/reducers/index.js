import filterReducer from "./filterType";
import uploadModalReducer from "./uploadModalReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    filter: filterReducer,
    isModalOpen: uploadModalReducer
})

export default rootReducers;