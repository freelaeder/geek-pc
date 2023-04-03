import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@reducers/userReducer";

const rootReducer = combineReducers({
    userReducer: persistReducer({key: "userReducer", storage}, userReducer),
});
export default rootReducer