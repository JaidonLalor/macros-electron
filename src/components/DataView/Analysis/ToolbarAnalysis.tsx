import React from "react";
import ToolbarTemplate from "../Templates/ToolbarTemplate";
import useAnalysisProvider from "@/providers/AnalysisProvider";

export default function AnalysisToolbar() {
    const { setViewRange, viewRange } = useAnalysisProvider();

    return (
        <ToolbarTemplate>
            <p>View Mode:</p>
            <p
                onClick={() => setViewRange('week')}
                className={`
                    text-blue-400 underline cursor-pointer
                    ${viewRange === 'week' ? 'font-bold text-blue-600' : ''}`}
            >Week</p>
            <p
                onClick={() => setViewRange('month')}
                className={`
                        text-blue-400 underline cursor-pointer
                        ${viewRange === 'month' ? 'font-bold text-blue-600' : ''}
                    `}
            >Month</p>
            <p
                onClick={() => setViewRange('all')}
                className={`
                    text-blue-400 underline cursor-pointer
                    ${viewRange === 'all' ? 'font-bold text-blue-600' : ''}
                    `}
            >All Time</p>
        </ToolbarTemplate>
    )
}