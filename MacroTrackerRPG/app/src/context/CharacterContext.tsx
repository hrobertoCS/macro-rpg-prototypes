import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react";
import { Character } from "@/character/Character";
import { ProgressionResult } from "@/progression/progressionTypes";
import { loadCharacter, saveCharacter, updateCharacter } from "@/database/db";
import {useMacros, MacroValues} from "@/context/MacroContext";
type CharacterContextValue = {

    // Null until character has been created
    character: Character | null;
    characterId: number | null;
    createCharacter: (name: string, targets: MacroValues) => Promise<void>;
    applyProgression: (result: ProgressionResult) => void;
};

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export function CharacterProvider({children}: {children: ReactNode}) {
    const [character, setCharacter] = useState<Character | null>(null);

    const [characterId, setCharacterId] = useState<number | null>(null);

    const {setTargets} = useMacros();


    // Load saved character when app starts
    useEffect(() => {
        async function restore() {
            const row = await loadCharacter();
            if (!row) return;
            setCharacter(new Character(
                row.name,
                row.level,
                row.xp,
                row.total_xp_earned,
                row.streak,
                {
                    strengthPotential: row.strength_potential,
                    endurancePotential: row.endurance_potential,
                    recoveryPotential: row.recovery_potential,
                },
            ));
            setCharacterId(row.id);

            setTargets({
                calories: row.target_calories,
                protein: row.target_protein,
                carbs: row.target_carbs,
                fat: row.target_fat,
            });
        }
        restore();
    }, []);

    async function createCharacter(name: string, targets: MacroValues) {
        const id = await saveCharacter(name, targets);

        setCharacter(new Character(name));
        setCharacterId(id);
        setTargets(targets);
    }

    // Applies progression for the day and returns new Character
    async function applyProgression(result: ProgressionResult) {

        if (!character || characterId === null) return;

        const updated = character.applyProgression(result);
        setCharacter(updated);

        await updateCharacter(
            characterId,
            updated.level,
            updated.xp,
            updated.totalXPEarned,
            updated.streak,
        );
    }

    const value =useMemo(
        () => ({ character, characterId, createCharacter, applyProgression}),
        [character, characterId]
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