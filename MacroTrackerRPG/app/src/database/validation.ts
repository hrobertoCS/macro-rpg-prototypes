import {MacroTotals} from "@/nutrition/macroTypes";

// Limits for daily macros
const MACRO_LIMITs = {
    calories: 20000,
    protein: 2000,
    carbs: 2000,
    fat: 2000,
};

export type ValidationResult = 
    | {valid: true}
    | {valid: false; error: string};



// First Defense in Depth layer. Validate values' type and range
// Validation happens before reaching database
export function validateMacros(macros: MacroTotals): ValidationResult {
    

    for (const macro of ['calories', 'protein', 'carbs', 'fat'] as const) {
        const value = macros[macro];


        // Check ensures that value is a number and is not infinite
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            return {valid: false, error: `${macro} must be a number` };
        }

        if (value < 0) {
            return { valid: false, error: `${macro} cannot be negative`};
        }

        if (value > MACRO_LIMITs[macro]) {
            return {valid: false, error: `${macro} limit reached`};
        }
    }

    return {valid: true};


}