import { Dispatch, SetStateAction } from "react";
import { AnalysisViewRange, NormalizedRecord } from "../types";
import { normalizeRecords } from "./normalizeRecords";
import { fetchRecordsByRange } from "./fetchRecordsByRange";

interface LoadRecordsProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
    setRecords: Dispatch<SetStateAction<NormalizedRecord[] | undefined>>;
    viewRange: AnalysisViewRange;
    startDate?: string;
    endDate?: string;
}

export const loadRecords = async ({ setIsLoading, setError, setRecords, viewRange, startDate, endDate }: LoadRecordsProps) => {
    setIsLoading(true);
    setError(null);
    
    try {
        const result = await fetchRecordsByRange(viewRange, startDate, endDate);
        const normalizedRecords = normalizeRecords(result, viewRange, startDate, endDate);
        setRecords(normalizedRecords);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch records');
        console.error('Error fetching records:', err);
    } finally {
        setIsLoading(false);
    }
};