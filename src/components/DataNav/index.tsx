import React, { useEffect, useState } from "react";

const DataNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleView = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        const button = document.getElementById("toggleView");
        if (button) {
          button.addEventListener("click", toggleView);
        }
        return () => {
          if (button) {
            button.removeEventListener("click", toggleView);
          }
        };
      }, []);

    return (
        <div className="h-full bg-blue-50 p-2">
            {isOpen ? (
                <div className="w-[20%] min-w-48">
                    <button
                        className="p-1 bg-slate-400"
                        id="toggleView"
                        >close</button>
                    <p className="opacity-35">Data nav not built yet</p>
                </div>
            ) : (
                <div>
                    <button
                        className="p-1 bg-slate-400"
                        id="toggleView"
                    >+</button>
                </div>
            )}
        </div>
    );
};

export default DataNav;