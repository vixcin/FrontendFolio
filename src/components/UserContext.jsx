import React, { createContext, useState } from "react";

// User context
export const UserContext = createContext();

// User provider
export const UserProvider = ({ children }) => {
    const [userContext, setUserContext] = useState({
        email: "",
        loggedIn: false,
        password: ""
    });

    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </UserContext.Provider>
    );
};
