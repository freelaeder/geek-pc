import {ArticleTypes} from "@store/types/articleTypes";
import {Pagination} from "response";
import {Article} from "article";

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

    export type Actions = RequestArticles | RequestArticlesError | RequestArticlesSuccess
}