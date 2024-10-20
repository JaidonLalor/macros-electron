import { Record } from "@/database/types";
import { AnalysisViewRange } from "../types";

export const fetchRecordsByRange = async (range: AnalysisViewRange): Promise<Record[]> => {
    let whereClause = '';
    if (range === 'week') {
        whereClause = 'WHERE r.date >= date("now", "-7 days")';
    } else if (range === 'month') {
        whereClause = 'WHERE r.date >= date("now", "-30 days")';
    } else if (range === 'all') {
        whereClause = ''; // No date filtering for 'all'
    }
    
    const result = await window.electronAPI.query(`
        SELECT 
            r.id,
            r.date,
            r.note,
            r.water,
            f.id as food_id,
            f.name as food_name,
            f.servings,
            f.caloriesPerServing,
            f.gramsProteinPerServing,
            f.gramsCarbsPerServing,
            f.gramsFatsPerServing
        FROM records r
        LEFT JOIN foods f ON f.record_id = r.id
        ${whereClause}
        ORDER BY r.date DESC
    `);

    // Group foods by record
    const recordsMap = new Map<number, Record>();

    result.forEach((row: any) => {
        if (!recordsMap.has(row.id)) {
            recordsMap.set(row.id, {
                id: row.id,
                date: row.date,
                note: row.note,
                water: row.water,
                foods: []
            });
        }

        if (row.food_id) {
            const record = recordsMap.get(row.id)!;
            record.foods.push({
                id: row.food_id,
                name: row.food_name,
                servings: row.servings,
                caloriesPerServing: row.caloriesPerServing,
                gramsProteinPerServing: row.gramsProteinPerServing,
                gramsCarbsPerServing: row.gramsCarbsPerServing,
                gramsFatsPerServing: row.gramsFatsPerServing
            });
        }
    });

    return Array.from(recordsMap.values());
};