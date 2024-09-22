//@/components/Layout.tsx
import React from "react";
import Header from "./Header";
import DataNav from "./DataNav";
import DataEntry from "./DataEntry";

const Layout = () => {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <Header/>
            <div className="flex flex-grow">
                <DataNav/>
                <DataEntry/>
            </div>
        </div>
    );
};

export default Layout;