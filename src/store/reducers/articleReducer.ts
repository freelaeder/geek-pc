import {Pagination, Status} from "response";
import {Article} from "article";
import {ArticleActions} from "@actions/articleActions";
import {ArticleTypes} from "@store/types/articleTypes";


export interface ArticleStatus {
    articles: {
        status: Status,
        result: Partial<Pagination<Article>>,
        error: string | null

    }
}

const initialState: ArticleStatus = {
    articles: {
        status: 'idle',
        result: {},
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

        default:
            return state
    }

}