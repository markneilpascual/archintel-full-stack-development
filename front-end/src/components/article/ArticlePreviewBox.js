import React from "react";
import { Badge } from "react-bootstrap";
import {Link} from "react-router-dom"

function ArticlePreviewBox({ article }) {
    const forEditing = () => {
        if (!article.is_published) {
            return (
                <Badge pill bg="warning" text="dark">
                    <i className="bi bi-pencil-fill"></i>
                    For editing
                </Badge>
            );
        }

        return;
    };

    return (
        <div className="d-flex">
            <div className="flex-grow-0 col-3">
                <div className="text-center">
                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                        className="bg-dark mx-auto"
                    ></div>
                    <Badge pill bg="success">
                        Safe to use
                    </Badge>
                    <div className="text-muted">{article.company.name}</div>
                    <Link to={`/article/${article.slug}`} className="text-decoration-none mt-2">
                        VIEW DETAILS
                    </Link>
                </div>
            </div>
            <div className="flex-grow-1 col-9">
                {forEditing()}
                <span className="ps-2 text-primary fw-bold">
                    {article.title}
                </span>
                <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{__html:article.content}}
                ></div>
            </div>
        </div>
    );
}

export default ArticlePreviewBox;
