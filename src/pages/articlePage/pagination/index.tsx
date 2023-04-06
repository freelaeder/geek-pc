// src/pages/articlePage/pagination/index.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default class Pagination extends React.Component {
    render() {
        return (
            <div className={styles.pagination}>
                <nav className="pagination">
                    <ul className="pagination-list">
                        <li>
                            <Link to="/" className="pagination-link">
                                上一页
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link">
                                1
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link">
                                2
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link is-current">
                                3
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link">
                                4
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link">
                                5
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="pagination-link">
                                下一页
                            </Link>
                        </li>
                        <li>
                            <div className="select">
                                <select>
                                    <option>10条/页</option>
                                    <option>15条/页</option>
                                    <option>20条/页</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}