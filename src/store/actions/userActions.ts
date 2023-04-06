import {UserTypes} from "@store/types/userTypes";
import {Credentials} from "auth";
import {User} from "user";

export namespace UserActions {

    export interface SaveCredentials {
        type: UserTypes.SAVE_CREDENTIALS,
        payload: {
            credentials: Credentials
        }
    }

    export interface RequestUserInfo {
        type: UserTypes.REQUEST_USER_INFO
    }

    export interface RequestUserInfoSuccess {
        type: UserTypes.REQUEST_USER_INFO_SUCCESS,
        payload: {
            user: User
        }
    }

    // 获取用户信息失败
    export interface RequestUserInfoError {
        type: UserTypes.REQUEST_USER_INFO_ERROR;
        error: string | null;
    }
    export interface ClearUser {
        type:UserTypes.CLEAR_USER
    }

    // User Actions
    export type Actions = SaveCredentials | RequestUserInfo | RequestUserInfoError | RequestUserInfoSuccess | ClearUser;
}