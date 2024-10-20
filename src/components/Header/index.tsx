import React from "react";

const Header = () => {    
    return (
        <div className=" bg-red-200 p-2 flex justify-between items-center w-full">
            <h3>macros app v0.3</h3>
            <div
                className="square-button"
                onClick={() => window.electronAPI.quit()}
            >
                <p>x</p>
            </div>
        </div>
    );
};

export default Header;