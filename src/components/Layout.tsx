//@/components/Layout.tsx
import React from "react";
import Header from "./Header";
import DataNav from "./DataNav";
import DataView from "./DataView";

const Layout = () => {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <Header/>
            <div className="flex flex-grow">
                <DataNav/>
                <DataView/>
            </div>
        </div>
    );
};

export default Layout;