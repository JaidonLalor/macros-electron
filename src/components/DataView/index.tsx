import React from "react";
import Entry from "./Entry";
import useViewProvider from "@/providers/ViewProvider";
import Presets from "./Presets";
import Toolbar from "./Toolbar";

const DataView = () => {
    const { currentView } = useViewProvider();

    return (
        <div className="relative flex-grow">
            {/* <Toolbar/> */}

            {currentView === 'idle' && (
                <div className="w-full h-full p-9">
                    <p className="text-gray-300"><i>Select a record to view in the left panel</i></p>
                </div>
            )}
            {(currentView === 'edit' || currentView === 'view') && <Entry/>}
            {(currentView === 'presets') && <Presets/>}
        </div>
    );
}

export default DataView;