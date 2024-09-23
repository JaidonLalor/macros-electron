import { useViewProvider } from "@/providers/ViewProvider";
import React, { useMemo } from "react";

const SumPanel = () => {
    const { record } = useViewProvider();

    const sumTableClass = "grid grid-cols-[repeat(4,minmax(0,1fr))] gap-2.5";

    const { totalCalories, totalProtein, totalCarbs, totalFats } = useMemo(() => {
        return record.foods.reduce((acc, food) => {
            const servings = Number(food.servings) || 0;
            return {
                totalCalories: acc.totalCalories + (food.caloriesPerServing * servings),
                totalProtein: acc.totalProtein + (food.gramsProteinPerServing * servings),
                totalCarbs: acc.totalCarbs + (food.gramsCarbsPerServing * servings),
                totalFats: acc.totalFats + (food.gramsFatsPerServing * servings)
            };
        }, {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0
        });
    }, [record.foods]);

    return (
        <>
            <p>Total:</p>
            <div className={sumTableClass}>
                <label>Calores</label>
                <label>Protein</label>
                <label>Carbs</label>
                <label>Fats</label>
            </div>

            <div className={sumTableClass}>
                <label>{totalCalories.toFixed(1)}</label>
                <label>{totalProtein.toFixed(1)}</label>
                <label>{totalCarbs.toFixed(1)}</label>
                <label>{totalFats.toFixed(1)}</label>
            </div>
        </>
    );
}

export default SumPanel;