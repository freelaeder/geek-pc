import {ArticleTypes} from "@store/types/articleTypes";
import {Pagination} from "response";
import {Article, PublishArticleParams} from "article";

export namespace ArticleActions {

    export interface RequestArticles {
        type: ArticleTypes.REQUEST_ARTICLES
    }

    export interface RequestArticlesSuccess {
        type: ArticleTypes.REQUEST_ARTICLES_SUCCESS,
        payload: { result: Pagination<Article> }
    }

    export interface RequestArticlesError {
        type: ArticleTypes.REQUEST_ARTICLES_ERROR,
        error: string | null

    }

    export interface GetArticleDate {
        type: ArticleTypes.REQUEST_ARTICLE
    }

    export interface GetArticleDateSuccess {
        type: ArticleTypes.REQUEST_ARTICLE_SUCCESS,
        payload: { article: PublishArticleParams }
    }

    export interface GetArticleDateError {
        type: ArticleTypes.REQUEST_ARTICLE_ERROR,
        error: string | null
    }

    export type Actions =
        RequestArticles
        | RequestArticlesError
        | RequestArticlesSuccess
        | GetArticleDate
        | GetArticleDateError
        | GetArticleDateSuccess
}