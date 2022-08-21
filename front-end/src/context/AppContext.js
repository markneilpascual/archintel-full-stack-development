import React, { createContext, useMemo, useState } from "react";

const AppContext = createContext({
    company: {},
    writer: {},
});

export const AppContextProvider = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [writer, setWriter] = useState({});
    const [company, setCompany] = useState({});

    const value = useMemo(
        () => ({
            writer,
            company,
            showSidebar,
            actions: {
                setWriter,
                setCompany,
                setShowSidebar
            },
        }),
        [writer, company, showSidebar]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
