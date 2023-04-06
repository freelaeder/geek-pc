import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@reducers/userReducer";
import {channelReducer} from "@reducers/channelReducer";

const rootReducer = combineReducers({
    userReducer: persistReducer({key: "userReducer", storage}, userReducer),
    channelReducer
});
export default rootReducer