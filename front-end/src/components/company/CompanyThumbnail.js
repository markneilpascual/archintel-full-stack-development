import React from "react";

function CompanyThumbnail({ name, active }) {
    const shortName = name.slice(0, 2);

    return (
        <div className={`rounded-3 bg-primary p-3 text-white fs-5 ${active ? 'bg-success' : ''}`} title={name}>
            {shortName}
        </div>
    );
}

export default CompanyThumbnail;
