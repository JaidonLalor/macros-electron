import React, { ReactNode } from "react";
import useViewProvider from "@/providers/ViewProvider";

const ToolbarTemplate = ({ children }: { children: ReactNode }) => {
    const { toggleSidePanel, sidePanelVisible } = useViewProvider();

    return (
        <>
            <div className="w-full p-2 pr-6 flex">
                {sidePanelVisible && (
                    <div
                        className="square-button"
                        onClick={() => toggleSidePanel()}
                    >
                        <p>&lt;</p>
                    </div>
                )}
                <div className="w-full flex gap-2 justify-end">
                    {children}
                </div>
            </div>
        </>
    );
}

export default ToolbarTemplate;