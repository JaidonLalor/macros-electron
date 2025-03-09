import { Record } from "@/database/types";
import { AnalysisViewRange } from "../types";

interface NormalizedRecord extends Record {
    isEmpty?: boolean;
}

export const normalizeRecords = (
    records: Record[], 
    viewRange: AnalysisViewRange,
    startDate?: string,
    endDate?: string
  ): NormalizedRecord[] => {
      const normalizedRecords: NormalizedRecord[] = [];
      const today = new Date();
      let daysToInclude: number | undefined;
      let startDateTime: number;
      
      // Determine the start date based on viewRange
      if (viewRange === 'week') {
          daysToInclude = 7;
          startDateTime = new Date(today).setDate(today.getDate() - 6);
      } else if (viewRange === 'month') {
          daysToInclude = 30;
          startDateTime = new Date(today).setDate(today.getDate() - 29);
      } else if (viewRange === 'custom' && startDate && endDate) {
          // For custom range, calculate days between startDate and endDate
          const start = new Date(startDate);
          const end = new Date(endDate);
          daysToInclude = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
          startDateTime = start.getTime();
      } else if (viewRange === 'all' && records.length > 0) {
          // For 'all' viewRange, use the earliest record date
          const earliestDate = new Date(Math.min(...records.map(r => new Date(r.date).getTime())));
          daysToInclude = Math.ceil((today.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          startDateTime = earliestDate.getTime();
      } else {
          // Fallback
          daysToInclude = 0;
          startDateTime = today.getTime();
      }
  
      // Create a map of existing records by date
      const recordMap = new Map(
          records.map(record => [record.date, record])
      );
  
      // Fill in all days
      const startDateObj = new Date(startDateTime);
      for (let i = 0; i < daysToInclude; i++) {
          const date = new Date(startDateObj);
          date.setDate(startDateObj.getDate() + i);
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
  
      return normalizedRecords;
  };