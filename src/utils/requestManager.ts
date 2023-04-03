import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import store from "@src/store";
import {history} from "@src/AppRouter";

interface requestInstance extends AxiosInstance {
    request<T, D>(config: AxiosRequestConfig<D>): Promise<T>;
}

export class RequestManager {
    // 单例对象
    private static _singleton_object: undefined | RequestManager;
    // 用于保存 axios 实例对象的属性
    private readonly _axios_instance: requestInstance;

    // 创建私有构造函数防止外部创建类实例
    private constructor() {
        // 创建 axios 实例对象, 配置请求基准地址
        this._axios_instance = axios.create({baseURL: process.env.REACT_APP_BASE_URL});
        //注册请求拦截器，在请求头中添加用户凭证
        this._axios_instance.interceptors.request.use((config) => {
            const state = store.getState()
            // 获取用户凭证
            const token = state.userReducer.credentials.token
            //是否存在
            if (token) config.headers = {Authorization: `Bearer ${token}`}
            // 返回
            return config
        })
        // 注册响应拦截器
        this._axios_instance.interceptors.response.use(
            (response) => response.data,
            (error: unknown) => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        history.replace('/login')
                    }
                }
                return Promise.reject(error)
            })
    }

    // 用于获取单例对象的静态方法
    // const r1 = RequestManager.instance
    public static get instance() {
        if (typeof RequestManager._singleton_object === 'undefined') {
            // 创建单例对象
            RequestManager._singleton_object = new RequestManager()
        }
        // 返回单例对象
        return RequestManager._singleton_object

    }

    public request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
        return this._axios_instance.request(config)
    }
}