import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@reducers/userReducer";
import {channelReducer} from "@reducers/channelReducer";
import {articleReducer} from "@reducers/articleReducer";

const rootReducer = combineReducers({
    userReducer: persistReducer({key: "userReducer", storage}, userReducer),
    channelReducer,
    articleReducer
});
export default rootReducer