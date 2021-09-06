import filterReducer from "./filterType";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    filter: filterReducer 
})

export default rootReducers;