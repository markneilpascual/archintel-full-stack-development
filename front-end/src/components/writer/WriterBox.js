import React from "react";

function WriterBox({writer}) {
    return (
        <div className="d-flex align-items-center px-2 py-1">
            <div className="flex-grow-0">
                <i className="bi bi-person-circle fs-1"></i>
            </div>
            <div className="ps-3">
                <div className="fw-bold">{writer.name}</div>
                <div className="fw-light">{writer.role}</div>
            </div>
        </div>
    );
}

export default WriterBox;
