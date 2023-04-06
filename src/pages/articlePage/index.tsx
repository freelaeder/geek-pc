// src/pages/articlePage/index.tsx
import React from "react";
import Breadcrumb from "@pages/articlePage/breadcrumb";
import FilterForm from "@pages/articlePage/filterForm";
import Pagination from "@pages/articlePage/pagination";
import List from "@pages/articlePage/articles/list";

export default class ArticlePage extends React.Component {
    render() {
        return (
            <>
                <div className="has-background-white mb-5">
                    <Breadcrumb/>
                    <FilterForm/>
                </div>
                <div className="has-background-white">
                    <List/>
                    <Pagination/>
                </div>
            </>
        );
    }
}