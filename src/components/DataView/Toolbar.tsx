import React from "react";
import useViewProvider from "@/providers/ViewProvider";

const Toolbar = () => {
    const { toggleSidePanel, sidePanelVisible } = useViewProvider();

    return (
        <div className="absolute top-0 w-full p-2">
            {sidePanelVisible && (
                <div
                    className="square-button"
                    onClick={() => toggleSidePanel()}
                >
                    <p>&lt;</p>
                </div>
            )}
        </div>
    );
}

export default Toolbar;