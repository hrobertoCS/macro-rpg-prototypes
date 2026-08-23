import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Character } from "@/character/Character";
import { ProgressionResult } from "@/progression/progressionTypes";


type CharacterContextValue = {

    // Null until character has been created
    character: Character | null;
    createCharacter: (name: string) => void;
    applyProgression: (result: ProgressionResult) => void;
};

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export function CharacterProvider({children}: {children: ReactNode}) {
    const [character, setCharacter] = useState<Character | null>(null);

    function createCharacter(name: string) {
        setCharacter(new Character(name));
    }

    // Applies progression for the day and returns new Character
    function applyProgression(result: ProgressionResult) {
        setCharacter(previous => 
            previous ? previous.applyProgression(result) :previous);

    }

    const value =useMemo(
        () => ({ character, createCharacter, applyProgression}),
        [character]
    )

    return <CharacterContext value = {value}>{children}</CharacterContext>;

    
}

export function useCharacter() {
        const context = useContext(CharacterContext);

        // If used outside provider fail
        if (!context) {
            throw new Error('useCharacter must be called within CharacterProvider');

        }

        return context;

    }