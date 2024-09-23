// src/hooks/useDeleteRecord.ts
import { useState } from 'react';

export const useDeleteRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecord = async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      // Delete the record
      await window.electronAPI.query('DELETE FROM records WHERE id = ?', [id]);

      // Delete associated foods
      await window.electronAPI.query('DELETE FROM foods WHERE record_id = ?', [id]);

      console.log(`Record with id ${id} and its associated foods deleted successfully`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while deleting the record');
      throw err; // Re-throw the error so it can be caught in the ViewProvider
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteRecord, isLoading, error };
};