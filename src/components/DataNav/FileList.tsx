import { useViewProvider } from "@/providers/ViewProvider";
import React from "react";

const FileList: React.FC = () => {
  const { recordList, writeNewRecord, selectRecord } = useViewProvider();

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between align-top">
        <h2 className="font-semibold mb-2">Records</h2>
        <button
          onClick={() => writeNewRecord()}
          className="text-lg bg-gray-200"
        >+</button>
      </div>
      <div className="flex-1 h-[150%] overflow-y-auto">
        <ul className="space-y-1">
          {recordList.map((record) => (
            <li
              key={record.id}
              className="hover:bg-blue-300 px-2 py-1 rounded"
              onClick={() => selectRecord(record.id)}
            >
              {record.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;