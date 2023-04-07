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


// 定义props 就是外部传递的props
interface OwnProps {
    articlesReducer: ArticleStatus
}

type Props = OwnProps

export default class List extends React.Component<Props> {

    render() {
        const {results, total_count} = this.props.articlesReducer.articles.result
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
                            results?.length !== 0 ? results?.map(item => <Item key={item.id} article={item}/>) :
                                <tr className={'ant-table-placeholder'}>

                                    <td colSpan={8} className="ant-table-cell">
                                        <div className="ant-empty ant-empty-normal">
                                            <div className="ant-empty-image">
                                                <svg className="ant-empty-img-simple" width="64" height="41"
                                                     viewBox="0 0 64 41"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                                                        <ellipse className="ant-empty-img-simple-ellipse" cx="32"
                                                                 cy="33"
                                                                 rx="32"
                                                                 ry="7"></ellipse>
                                                        <g className="ant-empty-img-simple-g" fill-rule="nonzero">
                                                            <path
                                                                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                                                            <path
                                                                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                                                className="ant-empty-img-simple-path"></path>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="ant-empty-description"
                                                 style={{textAlign: 'center'}}>暂无数据
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                        }


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}



