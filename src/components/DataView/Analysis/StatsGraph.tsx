import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAnalysisProvider from "@/providers/AnalysisProvider";
import { NormalizedRecord } from '@/providers/AnalysisProvider/types';

export default function StatsGraph() {
    const { records } = useAnalysisProvider();

    // Process data for the graph
    const chartData = records?.map((record: NormalizedRecord) => {
        const dailyTotals = record.foods.reduce((acc, food) => {
            const servings = food.servings;
            return {
                calories: acc.calories + (food.caloriesPerServing * servings),
                protein: acc.protein + (food.gramsProteinPerServing * servings),
                carbs: acc.carbs + (food.gramsCarbsPerServing * servings),
                fats: acc.fats + (food.gramsFatsPerServing * servings),
            };
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
    
        // Convert date to local timezone midnight
        const localDate = new Date(record.date);
        localDate.setHours(0, 0, 0, 0);
    
        const utcDate = new Date(record.date + 'T12:00:00Z');
    
        return {
            date: utcDate.toISOString(),
            isEmpty: record.isEmpty,
            ...dailyTotals
        };
    });

    console.log(chartData);

    return (
        <div className="h-[60%] w-full bg-slate-100 p-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                            const d = new Date(date);
                            return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
                        }}
                    />
                    {/* Left Y-axis for Calories */}
                    <YAxis 
                        yAxisId="calories"
                        domain={[0, 3000]}
                        orientation="left"
                        label={{ value: 'Calories', angle: -90, position: 'insideLeft' }}
                    />
                    {/* Right Y-axis for Macros (grams) */}
                    <YAxis 
                        yAxisId="macros"
                        domain={[0, 200]}
                        orientation="right"
                        label={{ value: 'Grams', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip 
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-2 border rounded shadow">
                                        <p>{new Date(label).toLocaleDateString(undefined, {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</p>
                                        {payload.map((entry) => (
                                            <p key={entry.name} style={{ color: entry.color }}>
                                                {entry.name}: {
                                                    typeof entry.value === 'number' 
                                                        ? entry.value.toFixed(1) 
                                                        : entry.value
                                                }
                                                {entry.name === 'calories' ? ' kcal' : 'g'}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    
                    {/* Calories line using left axis */}
                    <Line
                        yAxisId="calories"
                        type="monotone"
                        dataKey="calories"
                        stroke="#8884d8"
                        dot={false}
                        name="Calories"
                    />
                    
                    {/* Macro lines using right axis */}
                    <Line
                        yAxisId="macros"
                        type="monotone"
                        dataKey="protein"
                        stroke="#56cd83"
                        dot={false}
                        name="Protein"
                    />
                    <Line
                        yAxisId="macros"
                        type="monotone"
                        dataKey="carbs"
                        stroke="#df980c"
                        dot={false}
                        name="Carbs"
                    />
                    <Line
                        yAxisId="macros"
                        type="monotone"
                        dataKey="fats"
                        stroke="#ff7300"
                        dot={false}
                        name="Fats"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}