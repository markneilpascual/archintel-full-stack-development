import React from "react";

function StarRating({ rating }) {
    return (
        <div className="d-flex justify-content-between">
            {[...Array(rating)].map((star, i) => {
                return <i className="bi bi-star-fill text-warning" key={i}></i>;
            })}

            {[...Array(5 - rating)].map((star, i) => {
                return <i className="bi bi-star text-warning" key={i}></i>;
            })}
        </div>
    );
}

export default StarRating;
