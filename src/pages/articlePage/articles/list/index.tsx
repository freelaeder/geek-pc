// src/pages/articlePage/articles/list/index.tsx
import React from "react";
import styles from "./index.module.css";
import Item from "@pages/articlePage/articles/item";
import {connect, MapDispatchToPropsParam, MapStateToProps} from "react-redux";
import {ArticleStatus} from "@reducers/articleReducer";
import {AppState, AppThunkDispatch} from "@src/store";
import {articlesRequestParams} from "article";
import {ArticleActions} from "@actions/articleActions";
import {ArticleCreators} from "@store/creators/ArticleCreators";


interface StateProps {
    // 获取文章列表 Reducer
    articlesReducer: ArticleStatus
}

// 定义props 就是外部传递的props
interface OwnProps {
}

interface DispatchProps {
    // 获取文章列表
    requestArticles(reqParams?: articlesRequestParams): Promise<ArticleActions.Actions>
}


type Props = StateProps & OwnProps & DispatchProps

class List extends React.Component<Props> {

    async componentDidMount() {
        await this.props.requestArticles()
    }

    render() {
        const {results,total_count} = this.props.articlesReducer.articles.result
        return (
            <div className={styles.articles}>
                <div className={`p-5 is-size-5 has-text-weight-medium ${styles.total}`}>
                    根据筛选条件共查询到 {total_count} 条结果：
                </div>
                <div className="pl-5 pr-5 mt-5">
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                        <tr>
                            <th>封面</th>
                            <th>标题</th>
                            <th>状态</th>
                            <th>发布时间</th>
                            <th>阅读数</th>
                            <th>评论数</th>
                            <th>点赞数</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            results && results.map(item => <Item key={item.id} article={item}   />)
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state) => ({
    articlesReducer: state.articleReducer
})

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppThunkDispatch) => ({
    requestArticles: (reqParams) => dispatch(ArticleCreators.requestArticles(reqParams))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)