import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Record, emptyRecordState } from '@/database/types';
import { useSelectRecord } from './useSelectRecord';
import { usePushToDatabase } from './usePushToDatabase';
import { useDeleteRecord } from './useDeleteRecord';
import useViewProvider from "../ViewProvider";

interface RecordContextType {
    record: Record;
    setRecord: (record: Record) => void;
    recordList: Record[];
    writeNewRecord: () => void;
    selectRecord: (id: number | null) => void;
    pushToDatabase: () => Promise<void>;
    editRecord: () => void;
    isOldRecord: boolean;
    deleteRecord: () => Promise<void>;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const RecordProvider = ({ children }: { children: ReactNode }) => {
    const { currentView, setCurrentView } = useViewProvider();
    const [record, setRecord] = useState<Record>(emptyRecordState) as [Record, React.Dispatch<React.SetStateAction<Record>>];
    const [recordList, setRecordList] = useState<Record[]>([]);
    const [isOldRecord, setIsOldRecord] = useState<boolean>(false);
    const { selectRecord: selectRecordFunction, isLoading: selectLoading, error: selectError } = useSelectRecord(setRecord);
    const { pushToDatabase: pushToDatabaseFunction } = usePushToDatabase(record, isOldRecord);
    const { deleteRecord: deleteRecordFunction, isLoading: isDeleting, error: deleteError } = useDeleteRecord();

    useEffect(() => {
        const fetchRecords = async () => {
        try {
            const result = await window.electronAPI.query('SELECT id, date FROM records ORDER BY date DESC');
            setRecordList(result);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
        };
        fetchRecords();
    }, [currentView]);

    const deleteRecord = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (!confirmDelete) {
            return;
        }

        if (!record.id) {
            writeNewRecord();
            return;
        }

        try {
            await deleteRecordFunction(record.id);
            setRecordList(prevList => prevList.filter(r => r.id !== record.id));
            setRecord(emptyRecordState);
            setIsOldRecord(false);
            setCurrentView('idle');
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }

    const editRecord = () => {
        setIsOldRecord(true);
        setCurrentView('edit');
    }

    const writeNewRecord = () => {
        setRecord(emptyRecordState);
        setCurrentView('edit');
        setIsOldRecord(false);
    }

    const selectRecord = async (id: number | null) => {
        if (id === null || isNaN(id)) {
        console.error('Invalid id provided to selectRecord:', id);
        writeNewRecord();
        return;
        }

        try {
            await selectRecordFunction(id);
            setIsOldRecord(true);
            setCurrentView('view');
        } catch (error) {
            console.error('Error loading record:', error);
        }
    }

    const pushToDatabase = async () => {
        try {
            await pushToDatabaseFunction();
            setCurrentView('view');
            setIsOldRecord(true);
        } catch (error) {
            console.error('Error pushing to database:', error);
        }
    }

    const value = {
        record,
        setRecord,
        recordList,
        writeNewRecord,
        selectRecord,
        pushToDatabase,
        editRecord,
        isOldRecord,
        deleteRecord,
    }

    return (
        <RecordContext.Provider value={value}>
            {children}
        </RecordContext.Provider>
    );
};

const useRecordProvider = (): RecordContextType => {
    const context = useContext(RecordContext);
    if (context === undefined) {
      throw new Error('useRecordProvider must be used within a RecordProvider');
    }
    return context;
};

export default useRecordProvider;