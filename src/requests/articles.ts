import {RequestManager} from "@utils/requestManager";
import {GeekResponse, Pagination} from "response";
import {Channels} from "channels";
import {Article, articlesRequestParams, PublishArticleParams} from "article";
import {AxiosProgressEvent} from "axios";


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

// 删除文章
export function articleRemoveRequest(id: string) {
    return RequestManager.instance.request<GeekResponse<null>>({
        url: `/mp/articles/${id}`,
        method: "delete",
    });
}

// 发布文章
export function publishArticleRequest(draft: boolean, article: PublishArticleParams) {
    return RequestManager.instance.request<GeekResponse<{ id: string }>>({
        url: "/mp/articles",
        method: "post",
        params: {
            draft,
        },
        data: article,
    });
}

// 上传图片
export function uploadRequest(
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
    // 创建 FormData 对象
    const formData = new FormData();
    // 将要上传的文件追加到 FormData 对象中
    formData.append("image", file);
    // 发送请求上传文件
    return RequestManager.instance.request<GeekResponse<{ url: string }>>({
        url: "/upload",
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
}

// 获取文章详情
export function articleRequest(id: string) {
    return RequestManager.instance.request<GeekResponse<PublishArticleParams>>({
        url: `/mp/articles/${id}`,
    });
}

// src/requests/article.ts
// 编辑文章
export function updateArticleRequest(
    id: string,
    article: PublishArticleParams,
    draft: boolean
) {
    return RequestManager.instance.request<GeekResponse<{ id: string }>>({
        url: `/mp/articles/${id}`,
        method: "put",
        params: { draft },
        data: article,
    });
}