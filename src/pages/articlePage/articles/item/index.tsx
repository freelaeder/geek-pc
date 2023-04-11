// src/pages/articlePage/articles/item/index.tsx
import React from "react";
import {Article} from "article";


type Props = {
    article: Article;
};

export default class Item extends React.Component<Props> {
    render() {
        const {
             title, status, comment_count, pubdate,
            cover, like_count, read_count
        } = this.props.article
        return (
            <tr>
                <td>
                    {
                        cover.type === 1 ? <img src={cover.images[0]} width="200" alt=""/> : cover.images.map(item =>
                            <img key={item} width="100" src={item} alt=""/>)
                    }
                    {
                        cover.type === 0 && <img src={require("@image/placeholder.png")} width='200' alt={''}/>
                    }

                </td>
                <td>{title}</td>
                <td>
                    {
                        status === 0 && <span className="tag is-info">草稿</span>
                    }
                    {
                        status === 1 && <span className="tag is-link">待审核</span>
                    }
                    {
                        status === 2 && <span className="tag is-success">审核通过</span>
                    }
                    {
                        status === 3 && <span className="tag is-danger">审核失败</span>
                    }
                </td>
                <td> {pubdate}</td>
                <td>{read_count}</td>
                <td>{comment_count}</td>
                <td>{like_count}</td>
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