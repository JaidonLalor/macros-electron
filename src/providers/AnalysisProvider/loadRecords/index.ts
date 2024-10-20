import { Dispatch, SetStateAction } from "react";
import { AnalysisViewRange, NormalizedRecord } from "../types";
import { normalizeRecords } from "./normalizeRecords";
import { fetchRecordsByRange } from "./fetchRecordsByRange";

interface LoadRecordsProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<string | null>>;
    setRecords: Dispatch<SetStateAction<NormalizedRecord[] | undefined>>;
    viewRange: AnalysisViewRange;
}

export const loadRecords = async ({ setIsLoading, setError, setRecords, viewRange }: LoadRecordsProps) => {
    setIsLoading(true);
    setError(null);
    
    try {
        const result = await fetchRecordsByRange(viewRange);
        const normalizedRecords = normalizeRecords(result, viewRange);
        setRecords(normalizedRecords);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch records');
        console.error('Error fetching records:', err);
    } finally {
        setIsLoading(false);
    }
};