import React, { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import _ from "lodash";
import { startOfDay, subDays } from "date-fns";
import { endOfDay } from "date-fns/esm";

function ArticlesLastSevenDays({ articles }) {
    const [filteredArticles, setFilteredArticles] = useState({});

    useEffect(() => {
        const dateToday = endOfDay(new Date());
        const lastSevenDaysDate = startOfDay(subDays(dateToday, 7));

        if (articles) {
            const filteredArticles = _.filter(articles, (article) => {
                const articleDate = new Date(article.created_at);
                return (
                    articleDate >= lastSevenDaysDate && articleDate <= dateToday
                );
            });

            setFilteredArticles((state) => filteredArticles);
        }
    }, [articles]);

    return <ArticleList articles={filteredArticles} />;
}

export default ArticlesLastSevenDays;
