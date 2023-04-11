// src/pages/articlePage/index.tsx
import React from "react";
import Breadcrumb from "@pages/articlePage/breadcrumb";
import FilterForm from "@pages/articlePage/filterForm";
import Pagination from "@pages/articlePage/pagination";
import List from "@pages/articlePage/articles/list";
import {articlesRequestParams} from "article";
import {connect, MapDispatchToPropsParam, MapStateToProps} from "react-redux";
import {ArticleActions} from "@actions/articleActions";
import {AppState, AppThunkDispatch} from "@src/store";
import {ArticleCreators} from "@store/creators/ArticleCreators";
import {ArticleStatus} from "@reducers/articleReducer";


interface Status {
    // 组件内部
    reqParams: articlesRequestParams
}

interface StateProps {
    // 外部传递的mapStateToProps
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


class ArticlePage extends React.Component<Props, Status> {

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            reqParams: {
                // 开始日期
                begin_pubdate: null,
                // 结束日期
                end_pubdate: null,
                // 当前页
                page: 1,
                // 每页显示数据条数
                per_page: 10,
                // 文章状态
                status: undefined,
                // 频道列表
                channel_id: undefined,
            },
        }
    }

    async componentDidMount() {
        await this.props.requestArticles()
    }

    // 用于更新文章列表请求参数状态
    updateReqParams = (reqParam: articlesRequestParams) => {
        this.setState({
            reqParams: {
                ...this.state.reqParams,
                ...reqParam
            }
        })
    }

    // 按条件获取列表
    getArticleByReq = () => {
        this.props.requestArticles(this.state.reqParams)
    }

    // 组件更新后执行
    async componentDidUpdate(prevProps: Readonly<Props>,prevState: Readonly<Status>,) {
        // 监听 page和 per_page 是否发生变化
        if (
            prevState.reqParams.page !== this.state.reqParams.page ||
            prevState.reqParams.per_page !== this.state.reqParams.per_page
        ) {
            // 请求文章列表
            await this.props.requestArticles(this.state.reqParams);
        }
    }

    render() {
        const {results,total_count} = this.props.articlesReducer.articles.result
        const {page ,per_page} = this.state.reqParams
        return (
            <>
                <div className="has-background-white mb-5">
                    <Breadcrumb/>
                    <FilterForm getArticleByReq={this.getArticleByReq} updateReqParams={this.updateReqParams}
                                reqParams={this.state.reqParams}/>
                </div>
                <div className="has-background-white">
                    <List articlesReducer={this.props.articlesReducer}/>
                    {
                        results?.length !== 0 ? <Pagination page={page || 1} updateReqParams={this.updateReqParams}
                                                            total_count={total_count || 0 }
                                                            maxPageNum={5}
                                                            per_page={ per_page || 10}
                        /> : null
                    }

                </div>
            </>
        );
    }
}

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch: AppThunkDispatch) => ({
    requestArticles: (reqParams) => dispatch(ArticleCreators.requestArticles(reqParams))
})


const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state) => ({
    articlesReducer: state.articleReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage)