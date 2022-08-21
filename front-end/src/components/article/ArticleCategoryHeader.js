import React from "react";

function ArticleCategoryHeader({category}) {
    return (
        <div className="bg-primary text-center p-2">
            <span className="fw-bold text-white">{typeof category ==  'object'? category.name : category}</span>
        </div>
    );
}

export default ArticleCategoryHeader;
