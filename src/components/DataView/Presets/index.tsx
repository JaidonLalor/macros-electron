import { emptyPresetState, PresetType } from "@/database/types";
import usePresets from "@/providers/PresetProvider";
import React, { useState } from "react"

type PresetModeType = 'view' | 'edit';

export default function Presets() {
    const { presets, setPresets, savePresets } = usePresets();
    const [mode, setMode] = useState<PresetModeType>('view');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setPresets((prevPresets: PresetType[]) => prevPresets.map((preset: PresetType, i: number) => 
            i === index 
                ? { ...preset, [name]: name === 'name' ? value : Number(value) }
                : preset
        ));
    };

    const addPreset = () => {
        setPresets((prevPresets: PresetType[]) => [...prevPresets, emptyPresetState]);
    };
    
    const removePreset = (index: number) => {
        setPresets((prevPresets: PresetType[]) => prevPresets.filter((_, i: number) => i !== index));
    };

    const inputClass = '';
    const numberInputClass = `${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
    const tableClass = "grid grid-cols-[2fr_repeat(5,minmax(0,1fr))_auto] gap-2.5";

    return (
        <div className="w-full h-full p-6 overflow-scroll">
            <div className="w-full text-right">
                {mode === 'view' && (
                        <button
                            onClick={() => setMode('edit')}
                            className="text-blue-400 underline"
                        >Edit Presets</button>
                )}
                {mode === 'edit' && (
                        <button
                            onClick={() => {
                                savePresets(),
                                setMode('view')
                            }}
                            className="text-blue-400 underline"
                        >Save</button>
                )}
            </div>

            <div>
                {presets.map((preset: PresetType, index: number) => (
                    <div key={index} className={tableClass}>
                        <input
                            type="text"
                            name="name"
                            value={preset.name ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Preset Name"
                            className={inputClass}
                            disabled={mode === 'view'}
                        />
                        <input
                            type="number"
                            name="servings"
                            value={preset.servings ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Servings"
                            className={numberInputClass}
                            disabled={mode === 'view'}
                        />
                        <input
                            type="number"
                            name="caloriesPerServing"
                            value={preset.caloriesPerServing ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Calories"
                            className={numberInputClass}
                            disabled={mode === 'view'}
                        />
                        <input
                            type="number"
                            name="gramsProteinPerServing"
                            value={preset.gramsProteinPerServing ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Protein"
                            className={numberInputClass}
                            disabled={mode === 'view'}
                        />
                        <input
                            type="number"
                            name="gramsCarbsPerServing"
                            value={preset.gramsCarbsPerServing ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Carbs"
                            className={numberInputClass}
                            disabled={mode === 'view'}
                        />
                        <input
                            type="number"
                            name="gramsFatsPerServing"
                            value={preset.gramsFatsPerServing ?? ''}
                            onChange={(e) => handleInputChange(e, index)}
                            placeholder="Fats"
                            className={numberInputClass}
                            disabled={mode === 'view'}
                        />
                        {mode === 'edit' && (
                            <button
                                type="button"
                                onClick={() => removePreset(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        
            {mode === 'edit' && (
                <button
                    type="button"
                    onClick={addPreset}
                    className="text-blue-400"
                >
                    Add Preset
                </button>
            )}
        </div>

    );
}