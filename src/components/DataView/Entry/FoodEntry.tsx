import { Food, PresetType } from "@/database/types";
import usePresets from "@/providers/PresetProvider";
import React, { useEffect, useRef, useState } from "react";

interface FoodEntryProps {
    food: Food;
    index: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number) => void;
    onRemove: (index: number) => void;
    isViewOnly: boolean;
  }

const FoodEntry = ({ food, index, onChange, onRemove, isViewOnly }: FoodEntryProps) => {
    const [inputValue, setInputValue] = useState(food.name);
    const [suggestions, setSuggestions] = useState<PresetType[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { presets } = usePresets();

    useEffect(() => {
        setInputValue(food.name);
    }, [food.name]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onChange(e, index);
    
        // Filter presets based on input
        const filtered = presets.filter(preset => 
          preset.name?.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (preset: PresetType) => {
        setInputValue(preset.name ?? '');
        setShowSuggestions(false);
    
        // Update all fields at once
        onChange({
            target: {
                name: 'preset',
                value: JSON.stringify(preset)
            }
        } as React.ChangeEvent<HTMLInputElement>, index);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            const suggestionsDropdown = inputRef.current.nextElementSibling;
            if (suggestionsDropdown && suggestionsDropdown.contains(event.target as Node)) {
              return;
            }
            setShowSuggestions(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const inputClass = '';
    const tableClass = "grid grid-cols-[2fr_repeat(5,minmax(0,1fr))_auto] gap-2.5";
    const numberInputClass = `${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
  
    return (
      <div className={tableClass}>
        <div className="relative">
            <input
            ref={inputRef}
            type="text"
            name="name"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Food Name"
            className={inputClass}
            disabled={isViewOnly}
            />
            {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-red-300 max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                <li
                    key={suggestion.id}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                    {suggestion.name}
                </li>
                ))}
            </ul>
            )}
        </div>
        
        <input
            type="number"
            name="servings"
            value={food.servings}
            onChange={(e) => onChange(e, index)}
            placeholder="Servings"
            className={numberInputClass}
            disabled={isViewOnly}
        />
        <input
            type="number"
            name="caloriesPerServing"
            value={food.caloriesPerServing}
            onChange={(e) => onChange(e, index)}
            placeholder="Calories per Serving"
            className={numberInputClass}
            disabled={isViewOnly}
        />
        <input
            type="number"
            name="gramsProteinPerServing"
            value={food.gramsProteinPerServing}
            onChange={(e) => onChange(e, index)}
            placeholder="Grams Protein per Serving"
            className={numberInputClass}
            disabled={isViewOnly}
        />
        <input
            type="number"
            name="gramsCarbsPerServing"
            value={food.gramsCarbsPerServing}
            onChange={(e) => onChange(e, index)}
            placeholder="Grams Carbs per Serving"
            className={numberInputClass}
            disabled={isViewOnly}
        />
        <input
            type="number"
            name="gramsFatsPerServing"
            value={food.gramsFatsPerServing}
            onChange={(e) => onChange(e, index)}
            placeholder="Grams Fats per Serving"
            className={numberInputClass}
            disabled={isViewOnly}
        />

        {!isViewOnly && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500"
            disabled={isViewOnly}
          >
            Remove
          </button>
        )}
      </div>
    );
};

export default FoodEntry;