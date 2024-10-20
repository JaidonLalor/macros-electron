import React from "react";
import Entry from "./Entry";
import useViewProvider from "@/providers/ViewProvider";
import Presets from "./Presets";
import Analysis from "./Analysis";
import Idle from "./Templates/Idle";

const DataView = () => {
    const { currentView } = useViewProvider();

    return (
        <div className="relative flex-grow">

            {currentView === 'idle' && <Idle message='Select a record to view in the left panel' />}
            {(currentView === 'edit' || currentView === 'view') && <Entry/>}
            {(currentView === 'presets') && <Presets/>}
            {(currentView === 'analysis') && <Analysis/>}
        </div>
    );
}

export default DataView;