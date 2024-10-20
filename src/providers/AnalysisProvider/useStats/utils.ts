import { Record } from "@/database/types";
import { emptyMacros, Macros } from "@/types";

export function sumFoodsForRecord(record: Record): Macros {
    if (!record.foods) return emptyMacros;
    
    return record.foods.reduce((acc, food) => {
        const servings = Number(food.servings) || 0;
        return {
            calories: acc.calories + (food.caloriesPerServing * servings),
            protein: acc.protein + (food.gramsProteinPerServing * servings),
            carbs: acc.carbs + (food.gramsCarbsPerServing * servings),
            fats: acc.fats + (food.gramsFatsPerServing * servings)
        }
    }, emptyMacros);
}

export function sumRecords(records: Record[]): Macros {
    return records.reduce((acc, record) => {
        const recordTotals = sumFoodsForRecord(record);
        return {
            calories: acc.calories + recordTotals.calories,
            protein: acc.protein + recordTotals.protein,
            carbs: acc.carbs + recordTotals.carbs,
            fats: acc.fats + recordTotals.fats
        }
    }, emptyMacros);
}

export function averageRecords(records: Record[]): Macros {
    if (records.length === 0) return emptyMacros;
    
    const totals = sumRecords(records);
    
    return {
        calories: totals.calories / records.length,
        protein: totals.protein / records.length,
        carbs: totals.carbs / records.length,
        fats: totals.fats / records.length,
    };
}