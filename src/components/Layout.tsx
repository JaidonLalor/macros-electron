import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DataView from "./DataView";

const Layout = () => {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <Header/>
            <div className="flex-grow overflow-hidden">
                <div className="h-full flex">
                    <Sidebar/>
                    <DataView/>
                </div>
            </div>
        </div>
    );
};

export default Layout;