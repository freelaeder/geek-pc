declare module 'auth' {

    //登录表示
    export interface Auth {
        mobile: string;
        code: string;
    }

    // 登录请求返回值类型
    export interface Credentials {
        token: string;
        refresh_token: string;
    }


}
