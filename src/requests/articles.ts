import {RequestManager} from "@utils/requestManager";
import {GeekResponse, Pagination} from "response";
import {Channels} from "channels";
import {Article, articlesRequestParams} from "article";


// 获取channels

export function getAllChannels() {
    return RequestManager.instance.request<GeekResponse<{ channels: Channels[] }>>({
        url: '/channels'
    })
}


export function getArticles(reqParams?: Partial<articlesRequestParams>) {
    return RequestManager.instance.request<GeekResponse<Pagination<Article>>>({
        url: '/mp/articles',
        params: reqParams
    })
}