import { RecordList } from "@/providers/RecordProvider";

type GroupedRecords = {
    [monthYear: string]: RecordList;
};

export const groupRecordsByMonth = (records: RecordList): GroupedRecords => {
    return records.reduce((groups: GroupedRecords, record) => {
        const date = new Date(record.date);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(record);
        return groups;
    }, {});
};