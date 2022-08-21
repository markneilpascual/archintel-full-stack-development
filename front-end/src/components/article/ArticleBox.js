import { format } from "date-fns";
import React from "react";
import StarRating from "./StarRating";

function ArticleBox({article}) {
    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-grow-0">
                <div>
                    <i className="bi bi-pencil-fill text-success"></i>
                </div>
                <div>
                    <i className="bi bi-person-plus-fill text-primary"></i>
                </div>
                <div>
                    <i className="bi bi-file-earmark-x-fill text-danger"></i>
                </div>
            </div>
            <div className="ps-3">
                <div className="text-primary fw-bold">
                    {article.title}
                </div>
                <StarRating rating={article.rating} />
                <div className="text-muted">
                    <div>Created on {format(new Date(article.created_at),  "LLLL dd, yyyy hh:mm a")}</div>
                    <div>
                        [0 | 0] <i className="bi bi-dot"></i> Source Date Oct 7,
                        2021
                    </div>
                    <div>Media Date Oct 8, 2021</div>
                </div>
            </div>
            <div className="ms-auto flex-grow-0 align-self-center">
                <i className="bi bi-chat-right-text-fill text-primary fs-4"></i>
            </div>
        </div>
    );
}

export default ArticleBox;
