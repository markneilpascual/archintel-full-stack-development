import React, { useEffect, useState } from "react";
import _ from "lodash";
import ArticleCategoryHeader from "./ArticleCategoryHeader";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ArticleBox from "./ArticleBox";
import NoArticlesAvailable from "./NoArticlesAvailable";

function ArticleList({ articles }) {
    const [groupedArticles, setGroupedArticles] = useState({});

    useEffect(() => {
        if (articles.length) {
            const groupedArticles = _.groupBy(articles, "category.name");
            setGroupedArticles((state) => groupedArticles);
        }
    }, [articles]);

    if (articles.length) {
        return (
            <>
                {Object.keys(groupedArticles).map((category) => {
                    return (
                        <div key={category}>
                            <ArticleCategoryHeader category={category} key={category}/>
                            <ListGroup className="list-group-flush">
                                {groupedArticles[category].map((article) => {
                                    return (
                                        <ListGroupItem key={article.id}>
                                            <ArticleBox article={article} />
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </div >
                    );
                })}
            </>
        );
    }

    return <NoArticlesAvailable />;
}

export default ArticleList;
