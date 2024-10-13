import React from "react";
import FileList from "./FileList";
import useViewProvider from "@/providers/ViewProvider";

const Sidebar = () => {
    const { setCurrentView, toggleSidePanel, sidePanelVisible } = useViewProvider();

    return (
        <div className="h-full bg-blue-50 p-2">
            {sidePanelVisible ? (
                <div className="h-full w-[20%] min-w-36 flex flex-col justify-start gap-2">
                    
                    <FileList/>

                    <div>
                        <h2
                            onClick={() => setCurrentView('presets')}
                            className="font-semibold hover:bg-blue-300 px-2 py-1 rounded"
                        >Presets</h2>
                    </div>
                </div>
            ) : (
                <div
                    className="square-button"
                    onClick={() => toggleSidePanel()}
                >
                    <p>&gt;</p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;