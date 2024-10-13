// @/providers/ViewProvider/usePushToDatabase.ts
import { Record } from "@/database/types";

export const usePushToDatabase = (record: Record, isOldRecord: boolean) => {
    
    const pushToDatabase = async (): Promise<void> => {
        if (!window.electronAPI) {
            console.error('electronAPI is not available');
            return;
        }
        
        try {
            if (isOldRecord && record.id) {
                // Update existing record
                await window.electronAPI.updateRecord('records', 
                    {
                        date: record.date,
                        note: record.note,
                        water: parseFloat(record.water) || null
                    },
                    { id: record.id }
                );

                // Delete existing food items
                await window.electronAPI.deleteRecord('foods', { record_id: record.id });

                // Insert updated food items
                for (const food of record.foods) {
                    await window.electronAPI.insertRecord('foods', {
                        record_id: record.id,
                        ...food
                    });
                }

                console.log("Record updated successfully!");
            } else {
                // Insert new record
                const [recordId] = await window.electronAPI.insertRecord('records', {
                    date: record.date,
                    note: record.note,
                    water: parseFloat(record.water) || null
                });

                // Insert each food item
                for (const food of record.foods) {
                    await window.electronAPI.insertRecord('foods', {
                        record_id: recordId,
                        ...food
                    });
                }

                console.log("New record submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting/updating record:", error);
        }
    };

    return { pushToDatabase };
}