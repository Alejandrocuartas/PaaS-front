import React, { useState, createContext, useContext } from "react";

const logContext = createContext<any>(null);
const Context = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<any>();

    return (
        <logContext.Provider value={{
            id: user?.id,
            name: user?.name,
            email: user?.email,
            refetch: user?.refetch,
            setUser,
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };