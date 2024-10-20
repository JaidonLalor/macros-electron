import useRecordProvider from "@/providers/RecordProvider";
import React, { useState } from "react";
import { groupRecordsByMonth } from "../../utils/groupRecordsByMonth";

const FileList = () => {
  const { recordList, selectRecord } = useRecordProvider();
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const groupedRecords = groupRecordsByMonth(recordList);

  const toggleMonth = (month: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(month)) {
      newExpanded.delete(month);
    } else {
      newExpanded.add(month);
    }
    setExpandedMonths(newExpanded);
  }

  return (
    <div className="h-full max-h-full flex flex-col overflow-y-auto">
      <div className="overflow-y-auto">
        {Object.entries(groupedRecords).map(([month, records]) => (
          <div key={month} className="mb-2">
            <div
              className=" hover:bg-blue-300 px-2 rounded"
              onClick={() => toggleMonth(month)}
            >
              <span className="mr-2">{expandedMonths.has(month) ? '▼' : '▶'}</span>
              <span>{month}</span>
            </div>

            {expandedMonths.has(month) && (
              <ul className="ml-6">
                {records.map((record) => (
                  <li
                    key={record.id}
                    className="hover:bg-blue-300 px-2 py-1 rounded"
                    onClick={() => selectRecord(record.id)}
                  >
                    {record.date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default FileList;