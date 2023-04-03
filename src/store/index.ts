// src/store/index.ts
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import rootReducer from "@reducers/rootReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {RequestManager} from "@utils/requestManager";

const middlewares = [thunk];

const enhancers =
    process.env.NODE_ENV === "production"
        ? applyMiddleware(...middlewares)
        : composeWithDevTools(applyMiddleware(...middlewares));

// Redux 状态对象的类型
export type AppState = ReturnType<typeof store.getState>;
// 用于接收 Action 对象的 dispatch 方法的类型
export type AppDispatch = typeof store.dispatch;
// 用于接收 Action 函数的 dispatch 方法的类型
export type AppThunkDispatch = ThunkDispatch<AppState, any, Parameters<AppDispatch>[0]>;

const store = createStore(rootReducer, enhancers);

export default store;

const r1 = RequestManager.instance
const r2 = RequestManager.instance
// const r3 = new RequestManager()
// console.log(r1 === r2)