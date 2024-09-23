import React, { useState } from "react";
import FileList from "./FileList";

const DataNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    
    const toggleView = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="h-full bg-blue-50 p-2">
            {isOpen ? (
                <div className="w-[20%] min-w-36">
                    <button
                        className="p-1 bg-slate-200 px-2 py-1"
                        onClick={() => toggleView()}
                        >&lt;</button>
                    <FileList/>
                </div>
            ) : (
                <div>
                    <button
                        className="p-1 bg-slate-200 px-2 py-1"
                        onClick={() => toggleView()}
                    >&gt;</button>
                </div>
            )}
        </div>
    );
};

export default DataNav;