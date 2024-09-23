import React from "react";

const Header = () => {    
    return (
        <div className=" bg-red-200 p-2 flex justify-between items-center w-full">
            <h3>macros app v0.1</h3>
            {/* <button
                onClick={() => window.electronAPI.quit()}
                className="bg-gray-300 px-2 py-1"
                >x</button> */}
        </div>
    );
};

export default Header;