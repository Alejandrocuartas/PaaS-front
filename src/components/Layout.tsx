import * as React from "react";
import Navbar from "./Navbar";
const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default Layout;