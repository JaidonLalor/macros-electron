import React from "react";
import { AnalysisProvider } from "@/providers/AnalysisProvider";
import StatsPanel from "./StatsPanel";
import ToolbarAnalysis from "./ToolbarAnalysis";
import StatsGraph from "./StatsGraph";

export default function Analysis() {

    return (
        <AnalysisProvider>
            <ToolbarAnalysis />
            <div className="w-full h-full p-6 overflow-scroll">
                <div className="flex flex-col h-full w-full">
                    <StatsGraph/>
                    <StatsPanel/>
                </div>
            </div> 
        </AnalysisProvider>
    )
}