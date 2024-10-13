// src/database/types.ts

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
};

const emptyFoodState: Food = { 
    id: null,
    name: "", 
    servings: 1, 
    caloriesPerServing: 0, 
    gramsProteinPerServing: 0,
    gramsCarbsPerServing: 0, 
    gramsFatsPerServing: 0 
};

export const emptyRecordState: Record = {
    id: null,
    date: getTodayDate(),
    foods: [emptyFoodState],
    note: "",
    water: ""
};

export interface Food {
    id: number | null;
    name: string;
    servings: number;
    caloriesPerServing: number;
    gramsProteinPerServing: number;
    gramsCarbsPerServing: number;
    gramsFatsPerServing: number;
}

export interface Record {
    id: number | null;
    date: string;
    foods: Food[];
    note: string;
    water: string;
}

export const emptyPresetState: PresetType = {
    id: null,
    name: '',
    servings: null,
    caloriesPerServing: null,
    gramsProteinPerServing: null,
    gramsCarbsPerServing: null,
    gramsFatsPerServing: null,
    description: null,
    created_at: '',
    updated_at: '',
}

export interface PresetType {
    id: number | null;
    name: string | null;
    servings: number | null;
    caloriesPerServing: number | null;
    gramsProteinPerServing: number | null;
    gramsCarbsPerServing: number | null;
    gramsFatsPerServing: number | null;
    description: string | null;
    created_at: string;
    updated_at: string;
}