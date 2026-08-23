
// Progression weights and thresholds used by the 
// progression engine to calculate xp
export const PROGRESSION_RULES = {

    // Minimum and maximum macro ratios for xp to be given
    macroThresholds: {
        calories: {
            minimum: 0.75,
            maximum: 1.15,
        },

        protein: {
            minimum: 0.70,
            maximum: 1.60,
        },

        carbs: {
            minimum: 0.50,
            maximum: 1.30,
        },

        fat: {
            minimum: 0.40,
            maximum: 1.25,
        },
    },



    // Weights used to set how much each macro category
    // influences XP
    macroWeights: {
        calories: 0.40,
        protein: 0.35,
        carbs: 0.15,
        fat: 0.10,
    },

    // Type used to differentiate protein above target behavior
    overTargetType: {
        calories: 'decrease',
        protein: 'bonus',
        carbs: 'decrease',
        fat: 'decrease',
    },

    // Values used for xp calculation
    xp: {
        baseXP: 500,
        levelMultiplier: 1.5,
    }
};