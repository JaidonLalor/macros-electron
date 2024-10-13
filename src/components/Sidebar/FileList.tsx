import useRecordProvider from "@/providers/RecordProvider";
import React from "react";

const FileList = () => {
  const { recordList, writeNewRecord, selectRecord } = useRecordProvider();

  return (
    <div className="h-full max-h-full flex flex-col overflow-y-auto">

      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Records</h2>
        <div
          className="square-button"
          onClick={() => writeNewRecord()}
        >
          <p>+</p>
        </div>
          
      </div>

      <div className="overflow-y-auto">
        <ul>
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