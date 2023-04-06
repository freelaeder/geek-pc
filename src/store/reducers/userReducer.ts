// src/store/reducers/userReducer.ts
import {UserTypes} from "@store/types/userTypes";
import {Credentials} from "auth";
import {UserActions} from "@actions/userActions";
import {User} from "user";
import {Status} from "response";


export interface UserState {
    credentials: Partial<Credentials>,
    // 用户信息
    user: {
        result: Partial<User>;
        status: Status;
        error: string | null

    }

}

const initialState: UserState = {
    // 用于保存用户登录凭据
    credentials: {},
    user: {
        result: {},
        status: 'idle',
        error: null
    }
};

export default function userReducer(state = initialState, action: UserActions.Actions): UserState {
    switch (action.type) {
        case UserTypes.SAVE_CREDENTIALS:
            return {
                ...state,
                credentials: action.payload.credentials
            }
        case UserTypes.REQUEST_USER_INFO:
            return {
                ...state,
                user: {
                    result: {},
                    status: 'loading',
                    error: null
                }
            }
        case UserTypes.REQUEST_USER_INFO_SUCCESS:
            return {
                ...state,
                user: {
                    result: action.payload.user,
                    status: 'success',
                    error: null
                }
            }

        case UserTypes.REQUEST_USER_INFO_ERROR:
            return {
                ...state,
                user: {
                    result: {},
                    status: 'error',
                    error: action.error
                }

            }
        case UserTypes.CLEAR_USER:
            return initialState
        default:
            return state;
    }
}