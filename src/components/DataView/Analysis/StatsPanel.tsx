import React from "react"
import Idle from "../Templates/Idle";
import useAnalysisProvider from "@/providers/AnalysisProvider";

const sumTableClass = "grid grid-cols-[repeat(5,minmax(0,1fr))] gap-2.5";

export default function StatsPanel() {
    const { records, stats } = useAnalysisProvider();

    if (!records || records.length === 0) {
        return <Idle message='No records to display' />
    }

    return (
        <div className="h-fit w-full p-2 bg-slate-100">
            <div className={sumTableClass}>
                <label>Average Calores</label>
                <label>Average Protein</label>
                <label>Average Carbs</label>
                <label>Average Fats</label>
                <label>Days Logged</label>
            </div>

            <div className={sumTableClass}>
                <p>{stats.averages.calories.toFixed(1)}</p>
                <p>{stats.averages.protein.toFixed(1)}</p>
                <p>{stats.averages.carbs.toFixed(1)}</p>
                <p>{stats.averages.fats.toFixed(1)}</p>
                <p>{stats.coverage.loggedDays} / {stats.coverage.daysInRange}</p>
            </div>
        </div>
    )
}