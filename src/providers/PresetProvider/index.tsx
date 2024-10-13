import { emptyPresetState, PresetType } from "@/database/types";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface PresetContextType {
    presets: PresetType[];
    setPresets: Dispatch<SetStateAction<PresetType[]>>
    savePresets: () => Promise<any>;
}

const PresetContext = createContext<PresetContextType | undefined>(undefined);

export const PresetProvider = ({ children }: { children: ReactNode }) => {
    const [presets, setPresets] = useState<PresetType[]>([emptyPresetState]);

    useEffect(() => {
        fetchPresetsFromDB();
    }, []);

    const fetchPresetsFromDB = async () => {
        try {
            const fetchedPresets = await window.electronAPI.fetchPresets();
            setPresets(fetchedPresets);
        } catch (error) {
            console.error('Error fetching presets:', error);
        }
    };

    const savePresets = async () => {
        try {
            await window.electronAPI.savePresets(presets);
        } catch (error) {
            console.error('Error saving presets:', error);
        }
    };

    const value = {
        presets,
        setPresets,
        savePresets,
    }

    return (
        <PresetContext.Provider value={value}>
            {children}
        </PresetContext.Provider>
    );
};

const usePresets = (): PresetContextType => {
    const context = useContext(PresetContext);
    if (context === undefined) {
      throw new Error('usePresetProvider must be used within a PresetProvider');
    }
    return context;
};

export default usePresets;