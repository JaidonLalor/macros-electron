import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { loadRecords } from './loadRecords';
import { AnalysisViewRange, NormalizedRecord } from './types';
import { Stats, useStats } from './useStats';

interface AnalysisContextType {
    records: NormalizedRecord[] | undefined;
    setViewRange: Dispatch<SetStateAction<AnalysisViewRange>>;
    viewRange: AnalysisViewRange;
    startDate: string | undefined;
    setStartDate: Dispatch<SetStateAction<string | undefined>>;
    endDate: string | undefined;
    setEndDate: Dispatch<SetStateAction<string | undefined>>;
    isLoading: boolean;
    error: string | null;
    stats: Stats;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [records, setRecords] = useState<NormalizedRecord[] | undefined>();
    const [viewRange, setViewRange] = useState<AnalysisViewRange>('month');
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const stats = useStats(records);

    useEffect(() => {
        loadRecords({setRecords, setIsLoading, setError, viewRange, startDate, endDate});
    }, [viewRange]);

    console.log('Records:', records);

    return (
        <AnalysisContext.Provider value={{
            records,
            setViewRange,
            viewRange,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            isLoading,
            error,
            stats
        }}>
        {children}
        </AnalysisContext.Provider>
    );
};

const useAnalysisProvider = (): AnalysisContextType => {
    const context = useContext(AnalysisContext);
    if (context === undefined) {
        throw new Error('useAnalysisProvider must be used within an AnalysisProvider');
    }
    return context;
};

export default useAnalysisProvider;