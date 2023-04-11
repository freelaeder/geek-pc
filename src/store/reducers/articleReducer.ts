import {Pagination, Status} from "response";
import {Article, PublishArticleParams} from "article";
import {ArticleActions} from "@actions/articleActions";
import {ArticleTypes} from "@store/types/articleTypes";


export interface ArticleStatus {
    articles: {
        status: Status,
        result: Partial<Pagination<Article>>,
        error: string | null

    }
    article: {
        result: Partial<PublishArticleParams>;
        status: Status;
        error: string | null;
    };
}

const initialState: ArticleStatus = {
    articles: {
        status: 'idle',
        result: {},
        error: null
    },
    //单个文章
    article: {
        result: {},
        status: 'idle',
        error: null
    }

}

export function articleReducer(state = initialState, actions: ArticleActions.Actions): ArticleStatus {

    switch (actions.type) {
        case ArticleTypes.REQUEST_ARTICLES:
            return {
                ...state,
                articles: {
                    status: 'loading',
                    result: {},
                    error: null
                }
            }
        case ArticleTypes.REQUEST_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: {
                    status: 'success',
                    result: actions.payload.result,
                    error: null
                }
            }
        case ArticleTypes.REQUEST_ARTICLES_ERROR:
            return {
                ...state,
                articles: {
                    status: 'error',
                    result: {},
                    error: actions.error
                }
            }
        case ArticleTypes.REQUEST_ARTICLE:
            return {
                ...state,
                article: {
                    status: 'loading',
                    error: null,
                    result: {}

                }
            }
        case ArticleTypes.REQUEST_ARTICLE_SUCCESS:
            return {
                ...state,
                article: {
                    status: 'success',
                    error: null,
                    result: actions.payload.article

                }
            }
        case ArticleTypes.REQUEST_ARTICLE_ERROR:
            return {
                ...state,
                article: {
                    status: 'error',
                    error: actions.error,
                    result: {}
                }
            }
        default:
            return state
    }

}