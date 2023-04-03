import {Auth, Credentials} from "auth";
import {RequestManager} from "@utils/requestManager";
import {GeekResponse} from "response";
import {User} from "user";


// 用户登录
export function loginRequest(auth: Auth) {
    return RequestManager.instance.request<GeekResponse<Credentials>, Auth>({
        url: '/authorizations',
        method: 'post',
        data: auth
    })

}


// 获取用户信息

export function userInfoRequest() {
    return RequestManager.instance.request<GeekResponse<User>>({url: '/user/profile'})
}