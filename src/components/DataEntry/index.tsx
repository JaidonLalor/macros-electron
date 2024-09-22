import React, { useState } from "react";

const DataEntry = () => {
    const [record, setRecord] = useState({
        date: "",
        foods: [{ name: "", servings: 1, caloriesPerServing: 0, gramsProteinPerServing: 0, gramsCarbsPerServing: 0, gramsFatsPerServing: 0 }],
        note: "",
        water: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;

        // Handle changes for the 'foods' array
        if (index !== undefined) {
            const updatedFoods = [...record.foods];
            updatedFoods[index] = { ...updatedFoods[index], [name]: value };
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
                { name: "", servings: 1, caloriesPerServing: 0, gramsProteinPerServing: 0, gramsCarbsPerServing: 0, gramsFatsPerServing: 0 }
            ]
        });
    };

    const removeFood = (index: number) => {
        const updatedFoods = record.foods.filter((_, i) => i !== index);
        setRecord({ ...record, foods: updatedFoods });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting record:", record);
    }

    const inputClass = '';
    const numberInputClass = `${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
    const tableClass = "grid grid-cols-[repeat(6,minmax(0,1fr))_auto] gap-2.5";
    const spacerClass = "h-3";

    return (
        <div className="w-full h-full p-6 overflow-scroll">
            <form className="w-full min-h-[200%]" onSubmit={handleSubmit}>
                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        name="date"
                        value={record.date}
                        onChange={handleInputChange}
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
                        <div className="opacity-0">Remove</div>
                    </div>

                    {record.foods.map((food, index) => (
                        <div key={index} className={tableClass}>
                            <input
                                type="text"
                                name="name"
                                value={food.name}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Food Name"
                                className={inputClass}
                            />
                            <input
                                type="number"
                                name="servings"
                                value={food.servings}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Servings"
                                className={numberInputClass}
                            />
                            <input
                                type="number"
                                name="caloriesPerServing"
                                value={food.caloriesPerServing}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Calories per Serving"
                                className={numberInputClass}
                            />
                            <input
                                type="number"
                                name="gramsProteinPerServing"
                                value={food.gramsProteinPerServing}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Grams Protein per Serving"
                                className={numberInputClass}
                            />
                            <input
                                type="number"
                                name="gramsCarbsPerServing"
                                value={food.gramsCarbsPerServing}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Grams Carbs per Serving"
                                className={numberInputClass}
                            />
                            <input
                                type="number"
                                name="gramsFatsPerServing"
                                value={food.gramsFatsPerServing}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Grams Fats per Serving"
                                className={numberInputClass}
                            />
                            <button
                                type="button"
                                onClick={() => removeFood(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addFood}
                    className="text-blue-400"
                >
                    Add Food
                </button>

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
                    ></textarea>
                </div>

                <div className={spacerClass}/>

                <button
                    type="submit"
                    className="p-1 px-2 bg-blue-400 text-white"
                >
                    Submit
                </button>

                <div className={spacerClass}/>
                <p className="text-gray-300">Future: add day sum totals in this component</p>
            </form>
        </div>
    );
};

export default DataEntry;