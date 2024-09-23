// src/hooks/useRecordSelection.ts
import { useState } from 'react';
import { Record, Food } from "@/database/types";

export const useSelectRecord = (setRecord: (record: Record) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectRecord = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch the full record data for the selected id
      const recordResult = await window.electronAPI.query('SELECT * FROM records WHERE id = ?', [id]);
      
      if (recordResult && recordResult.length > 0) {
        const recordData = recordResult[0];
        
        // Fetch the foods for this record
        const foodsResult = await window.electronAPI.query('SELECT * FROM foods WHERE record_id = ?', [id]);
        
        // Map the food results to match the Food type
        const foods: Food[] = foodsResult.map((food: any) => ({
          id: food.id,
          name: food.name,
          servings: food.servings,
          caloriesPerServing: food.caloriesPerServing,
          gramsProteinPerServing: food.gramsProteinPerServing,
          gramsCarbsPerServing: food.gramsCarbsPerServing,
          gramsFatsPerServing: food.gramsFatsPerServing
        }));

        // Construct the full record object
        const fullRecord: Record = {
          id: recordData.id,
          date: recordData.date,
          foods: foods,
          note: recordData.note || "",
          water: recordData.water ? recordData.water.toString() : ""
        };

        // Set the current record
        console.log('fullRecord:', fullRecord);
        setRecord(fullRecord);
      } else {
        setError('No record found for the selected id');
      }
    } catch (error) {
      console.error('Error fetching record details:', error);
      setError('Failed to fetch record details');
    } finally {
      setIsLoading(false);
    }
  };

  return { selectRecord, isLoading, error };
};