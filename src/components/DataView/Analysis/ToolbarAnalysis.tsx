import React, { useState } from "react";
import ToolbarTemplate from "../Templates/ToolbarTemplate";
import useAnalysisProvider from "@/providers/AnalysisProvider";

export default function AnalysisToolbar() {
    const { setViewRange, viewRange, setStartDate, setEndDate } = useAnalysisProvider();
    const [showDatePickers, setShowDatePickers] = useState(false);

    const handleCustomClick = () => {
        setViewRange('custom');
        setShowDatePickers(true);
    };

    const handleDateChange = (type: 'start' | 'end', e: React.ChangeEvent<HTMLInputElement>) => {
        // ISO format: YYYY-MM-DD (matches SQLite date format)
        const date = e.target.value;
        if (type === 'start') {
            setStartDate(date);
        } else {
            setEndDate(date);
        }
    };

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
            <p
                onClick={handleCustomClick}
                className={`
                    text-blue-400 underline cursor-pointer
                    ${viewRange === 'custom' ? 'font-bold text-blue-600' : ''}
                `}
            >Custom</p>
            
            {showDatePickers && (
                <div className="flex items-center space-x-2 ml-4">
                    <div>
                        <label htmlFor="start-date" className="text-sm block">Start:</label>
                        <input 
                            type="date" 
                            id="start-date"
                            onChange={(e) => handleDateChange('start', e)}
                            className="p-1 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="end-date" className="text-sm block">End:</label>
                        <input 
                            type="date" 
                            id="end-date"
                            onChange={(e) => handleDateChange('end', e)}
                            className="p-1 border rounded text-sm"
                        />
                    </div>
                </div>
            )}
        </ToolbarTemplate>
    )
}