import {UserActions} from "@actions/userActions";
import {UserTypes} from "@store/types/userTypes";
import {Credentials} from "auth";
import {ThunkAction} from "redux-thunk";
import {AppState} from "@src/store";
import {userInfoRequest} from "@requests/auth";
import {AxiosError} from "axios";

export namespace UserCreators {
    // 保存用户登录凭据
    export const saveUserInfoCreator = (credentials: Credentials): UserActions.SaveCredentials => ({
        type: UserTypes.SAVE_CREDENTIALS,
        payload: {credentials}

    })

    // 获取用户信息
    export const requestUserInfoCreator = (): ThunkAction<Promise<UserActions.Actions>, AppState, any, UserActions.Actions> => async (dispatch) => {

        // 更新状态
        dispatch({type: UserTypes.REQUEST_USER_INFO})
        // 捕获错误
        try {
            // 获取用户信息
            const res = await userInfoRequest()
            return dispatch({type: UserTypes.REQUEST_USER_INFO_SUCCESS, payload: {user: res.data}})

        } catch (error) {
            // 保存请求失败信息
            if (error instanceof AxiosError) {
                return Promise.reject(
                    dispatch({
                        type: UserTypes.REQUEST_USER_INFO_ERROR,
                        error: error.response?.data.message,
                    })
                );
            }
            // 抛出异常
            return Promise.reject(error);

        }

    }
}