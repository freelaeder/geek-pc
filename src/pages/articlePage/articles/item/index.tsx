// src/pages/articlePage/articles/item/index.tsx
import React from "react";

export default class Item extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={require("@image/placeholder.png")} width="200" alt="" />
                </td>
                <td>webview离线化加载h5资源解决方案</td>
                <td>
                    <span className="tag is-info">草稿</span>
                    <span className="tag is-link">待审核</span>
                    <span className="tag is-success">审核通过</span>
                    <span className="tag is-danger">审核失败</span>
                </td>
                <td> 2019-03-11 09:00:00</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                    <button className="button is-success is-rounded is-small mr-2">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="button is-danger is-rounded is-small">
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        );
    }
}