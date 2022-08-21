import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StarRating from "../../components/article/StarRating";
import Article from "../../services/article";

function ArticleDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState();

    const fetchArticle = (slug) => {
        Article.find(slug)
            .then((response) => {
                setArticle((state) => response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchArticle(slug);
    }, [slug]);

    if (!article) return;
    return (
        <Card>
            <Card.Body>
                <h1>{article.title}</h1>
                <h3 className="text-muted">{article.writer.name} <i className="bi bi-dot"></i> <small>{article.company.name}</small></h3>
                <div style={{ width: "200px" }}>
                    <StarRating rating={article.rating} />
                </div>
                <div className="py-3" dangerouslySetInnerHTML={{__html:article.content}}>

                </div>
            </Card.Body>
        </Card>
    );
}

export default ArticleDetail;
