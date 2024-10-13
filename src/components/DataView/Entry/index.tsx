import React from "react";
import useViewProvider from "@/providers/ViewProvider";
import SumPanel from "./SumPanel";
import useRecordProvider from "@/providers/RecordProvider";
import FoodEntry from "./FoodEntry";

const Entry = () => {
    const { currentView } = useViewProvider();
    const { record, setRecord, isOldRecord, editRecord, pushToDatabase, deleteRecord } = useRecordProvider();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
        const { name, value } = e.target;

        console.log(`Received update for ${name}: ${value}`);

        // Handle changes for the 'foods' array
        if (name === 'preset' && index !== undefined) {
            const preset = JSON.parse(value);
            const updatedFoods = [...record.foods];
            updatedFoods[index] = {
                ...updatedFoods[index],
                name: preset.name,
                caloriesPerServing: preset.caloriesPerServing,
                gramsProteinPerServing: preset.gramsProteinPerServing,
                gramsCarbsPerServing: preset.gramsCarbsPerServing,
                gramsFatsPerServing: preset.gramsFatsPerServing
            };
            setRecord({ ...record, foods: updatedFoods });
        } else if (index !== undefined) {
            const updatedFoods = [...record.foods];
            updatedFoods[index] = { ...updatedFoods[index], [name]: value };
            console.log('Updated food:', updatedFoods);
            setRecord({ ...record, foods: updatedFoods });
        } else {
            setRecord({ ...record, [name]: value });
        }
    };

    const addFood = () => {
        setRecord({
            ...record,
            foods: [
                ...record.foods,
                { id: null, name: "", servings: 1, caloriesPerServing: 0, gramsProteinPerServing: 0, gramsCarbsPerServing: 0, gramsFatsPerServing: 0 }
            ]
        });
    };

    const removeFood = (index: number) => {
        const updatedFoods = record.foods.filter((_, i) => i !== index);
        setRecord({ ...record, foods: updatedFoods });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await pushToDatabase();
    };

    const isViewOnly = currentView === 'view';

    const inputClass = '';
    const numberInputClass = `${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
    const tableClass = "grid grid-cols-[2fr_repeat(5,minmax(0,1fr))_auto] gap-2.5";
    const spacerClass = "h-3";

    return (
        <div className="w-full h-full p-6 overflow-scroll">
            <div className="w-full text-right">
                {isViewOnly && (
                        <button
                            onClick={() => editRecord()}
                            className="text-blue-400 underline"
                        >Edit</button>
                )}
                {!isViewOnly && isOldRecord && (
                    <button
                        onClick={() => deleteRecord()}
                        className="text-red-500 underline"
                    >Delete Record</button>
                )}
            </div>

            <form className="w-full min-h-[200%]" onSubmit={handleSubmit}>

                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        name="date"
                        value={record.date}
                        onChange={handleInputChange}
                        disabled={isViewOnly}                        
                    />
                </div>

                <div className={spacerClass}/>

                <div>
                    <div className={tableClass}>
                        <label>Name</label>
                        <label>Servings</label>
                        <label>Calores</label>
                        <label>Protein</label>
                        <label>Carbs</label>
                        <label>Fats</label>
                        {!isViewOnly && <div className="opacity-0">Remove</div>}
                    </div>

                    {record.foods.map((food, index) => (
                        <FoodEntry
                            key={index}
                            food={food}
                            index={index}
                            onChange={handleInputChange}
                            onRemove={removeFood}
                            isViewOnly={isViewOnly}
                        />
                    ))}
                </div>

                {!isViewOnly && (
                    <button
                        type="button"
                        onClick={addFood}
                        className="text-blue-400"
                        disabled={isViewOnly}
                    >
                        Add Food
                    </button>
                )}

                <div className={spacerClass}/>

                <div>
                    <label>Water: </label>
                    <input
                        type="number"
                        name="water"
                        value={record.water}
                        onChange={handleInputChange}
                        className={numberInputClass}
                        placeholder="(optional)"
                        disabled={isViewOnly}
                    />
                </div>
                
                <div className={spacerClass}/>

                <div>
                    <label className="block">Note:</label>
                    <textarea
                        name="note"
                        value={record.note}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300"
                        placeholder="(optional)"
                        disabled={isViewOnly}
                    ></textarea>
                </div>

                <div className={spacerClass}/>
                
                {!isViewOnly && (
                    <button
                        type="submit"
                        className="p-1 px-2 bg-blue-400 text-white"
                    >
                        {isOldRecord ? 'Update Record' : 'Submit'}
                    </button>
                )}

                <div className={spacerClass}/>
                <SumPanel/>
            </form>
        </div>
    );
};

export default Entry;