import { Record } from "@/database/types";
import { AnalysisViewRange } from "../types";

interface NormalizedRecord extends Record {
    isEmpty?: boolean;
}

export const normalizeRecords = (records: Record[], viewRange: AnalysisViewRange): NormalizedRecord[] => {
    const normalizedRecords: NormalizedRecord[] = [];
    const today = new Date();
    let daysToInclude = viewRange === 'week' ? 7 
        : viewRange === 'month' ? 30 
        : undefined;

    // For 'all' viewRange, use the earliest record date
    if (viewRange === 'all' && records.length > 0) {
        const earliestDate = new Date(Math.min(...records.map(r => new Date(r.date).getTime())));
        daysToInclude = Math.ceil((today.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    // Create a map of existing records by date
    const recordMap = new Map(
        records.map(record => [record.date, record])
    );

    // Fill in all days
    for (let i = 0; i < daysToInclude!; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        if (recordMap.has(dateStr)) {
            normalizedRecords.push({
                ...recordMap.get(dateStr)!,
                isEmpty: false
            });
        } else {
            normalizedRecords.push({
                id: -i, // Temporary negative ID for empty records
                date: dateStr,
                note: '',
                water: '',
                foods: [],
                isEmpty: true
            });
        }
    }

    return normalizedRecords.reverse(); // To keep chronological order
};