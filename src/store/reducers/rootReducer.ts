import {combineReducers} from "redux";
import userReducers from "@reducers/userReducer";


const  rootReducer = combineReducers(userReducers)
export default  rootReducer