import {ThunkAction} from "redux-thunk";
import {AppState} from "@src/store";
import {ArticleActions} from "@actions/articleActions";
import {ArticleTypes} from "@store/types/articleTypes";
import {articlesRequestParams} from "article";
import {articleRequest, getArticles} from "@requests/articles";
import {AxiosError} from "axios";


export namespace ArticleCreators {
    export const requestArticles = (reqParams?: articlesRequestParams): ThunkAction<Promise<ArticleActions.Actions>, AppState, any, ArticleActions.Actions> => async (
        dispatch) => {
        dispatch({type: ArticleTypes.REQUEST_ARTICLES})

        try {
            const res = await getArticles(reqParams)
            return dispatch({type: ArticleTypes.REQUEST_ARTICLES_SUCCESS, payload: {result: res.data}})
        } catch (e) {

            if (e instanceof AxiosError) {
                return Promise.reject(dispatch({type: ArticleTypes.REQUEST_ARTICLES_ERROR, error: ''}))
            }
            return Promise.reject(e)
        }


    }


    export const requestArticle = (id: string): ThunkAction<Promise<ArticleActions.Actions>, AppState, any, ArticleActions.Actions> => async (dispatch) => {
        dispatch({
            type: ArticleTypes.REQUEST_ARTICLE
        })
        try {

            const res = await articleRequest(id)
            return dispatch({
                type: ArticleTypes.REQUEST_ARTICLE_SUCCESS, payload: {
                    article: res.data
                }
            })

        } catch (e) {

            if (e instanceof AxiosError) {
                return Promise.reject(dispatch({
                    type: ArticleTypes.REQUEST_ARTICLE_ERROR,
                    error: e.response?.data.error
                }))
            }
            return Promise.reject(e)
        }

    }
}