import React, { useEffect, useState } from 'react'
import ArticleList from './ArticleList';
import _ from "lodash"
import { format } from 'date-fns';

function ArticlesToday({articles}) {
    const [filteredArticles, setFilteredArticles] = useState({})

    useEffect(() => {
        const dateToday = format(new Date(), "yyyy-MM-dd")
        if(articles){
            
            const filteredArticles = _.filter(articles,(article)=>{
                const articleDate = format(new Date(article.created_at), "yyyy-MM-dd")
                return articleDate === dateToday
            })
            
            setFilteredArticles(state=>filteredArticles)
            
        }
    }, [articles])
    

  return (
    <ArticleList articles={filteredArticles} />
  )
}

export default ArticlesToday