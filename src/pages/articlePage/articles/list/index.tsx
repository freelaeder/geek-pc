// src/pages/articlePage/articles/list/index.tsx
import React from "react";
import styles from "./index.module.css";
import Item from "@pages/articlePage/articles/item";

export default class List extends React.Component {
    render() {
        return (
            <div className={styles.articles}>
                <div className={`p-5 is-size-5 has-text-weight-medium ${styles.total}`}>
                    根据筛选条件共查询到 1000 条结果：
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
                        <Item />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}