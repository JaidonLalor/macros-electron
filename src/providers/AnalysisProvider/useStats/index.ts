import { useMemo } from "react";
import { NormalizedRecord } from "../types";
import { averageRecords, sumRecords } from "./utils";
import { emptyMacros, Macros } from "@/types";

export interface Stats {
    coverage: {
        daysInRange: number;
        loggedDays: number;
        percentage: number;
    }
    averages: Macros;
}

const emptyStats = {
    coverage: {
        daysInRange: 0,
        loggedDays: 0,
        percentage: 0,
    },
    averages: emptyMacros,
}

function getStats(records: NormalizedRecord[] | undefined): Stats {
    if (!records) return emptyStats;

    const averages = averageRecords(records);
    const daysInRange = records.length;
    const loggedDays = records.filter(r => !r.isEmpty).length
    
    return {
        coverage: {
            daysInRange: daysInRange,
            loggedDays: loggedDays,
            percentage: (loggedDays / daysInRange) * 100
        },
        averages
    };
}

export function useStats(records: NormalizedRecord[] | undefined): Stats {
    return useMemo(() => getStats(records), [records]);
}