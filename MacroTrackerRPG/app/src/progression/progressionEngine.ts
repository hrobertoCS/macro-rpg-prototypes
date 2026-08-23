import { ProgressionResult, Potentials} from "./progressionTypes";
import { PROGRESSION_RULES } from "./progressionRules";
import { MacroTotals, MacroTargets} from "@/nutrition/macroTypes";


export function calculateProgression( 
    totals: MacroTotals,
    targets: MacroTargets,
): ProgressionResult {

    // Macro ratio calculation 
    const macroRatio = {
        calories: totals.calories / targets.calories,
        protein: totals.protein / targets.protein,
        carbs: totals.carbs / targets.carbs,
        fat: totals.fat / targets.fat,
    };

    // Check scores against minimum and maximum to determine if 0
    function calculateScore(
        ratio: number,
        minimum: number,
        maximum: number,
        overTargetType: string,
    ): number {
        if (ratio < minimum || ratio > maximum) {
            if (overTargetType === 'bonus'&& ratio > maximum) {
                return ((maximum - minimum ) / (1 - minimum)) * 100;
            }
            return 0;

        }

        if ( ratio > 1) {

            if (overTargetType === 'bonus') {
                return ((ratio - minimum) / (1 - minimum)) * 100;
            }
            return (1 / ratio) * 100;
        }


        return ((ratio - minimum) / ( 1 - minimum )) * 100;

        
    }

    // Macro scores with thresholds applied
    const scores = {
        calories: calculateScore(
            macroRatio.calories,
            PROGRESSION_RULES.macroThresholds.calories.minimum,
            PROGRESSION_RULES.macroThresholds.calories.maximum,
            PROGRESSION_RULES.overTargetType.calories,
        ),
        protein: calculateScore(
            macroRatio.protein,
            PROGRESSION_RULES.macroThresholds.protein.minimum,
            PROGRESSION_RULES.macroThresholds.protein.maximum,
            PROGRESSION_RULES.overTargetType.protein
        ),
        carbs: calculateScore(
            macroRatio.carbs,
            PROGRESSION_RULES.macroThresholds.carbs.minimum,
            PROGRESSION_RULES.macroThresholds.carbs.maximum,
            PROGRESSION_RULES.overTargetType.carbs,

        ),
        fat: calculateScore(
            macroRatio.fat,
            PROGRESSION_RULES.macroThresholds.fat.minimum,
            PROGRESSION_RULES.macroThresholds.fat.maximum,
            PROGRESSION_RULES.overTargetType.fat,

        ),
    };

    //Apply weights to determine overall score to calculate XP
    const progressionScore = 
        (scores.calories * PROGRESSION_RULES.macroWeights.calories) +
        (scores.protein * PROGRESSION_RULES.macroWeights.protein) + 
        (scores.carbs * PROGRESSION_RULES.macroWeights.carbs) +
        (scores.fat * PROGRESSION_RULES.macroWeights.fat) 


    
    let xpEarned = progressionScore;

    // XP is 0 if both calories and protein are below the minimum thresholds
    // or if calories is above maximum and protein is below minimum
    if (
        ( macroRatio.calories < PROGRESSION_RULES.macroThresholds.calories.minimum ||
             macroRatio.calories > PROGRESSION_RULES.macroThresholds.calories.maximum )&&
        (macroRatio.protein < PROGRESSION_RULES.macroThresholds.protein.minimum ) 
    ) {
        xpEarned = 0;
    }

    // XP is 0 if three or more macro scores fail their thresholds
    const failedMacros = Object.values(scores).filter(score =>
        score === 0).length;

    if (failedMacros >= 3) {
        xpEarned = 0;
    }

    // Round XP after all rules and penalties are applied
    xpEarned = Math.round(xpEarned);

    // TODO: Include macro history in potential calculation 
    // Temporary calculation using daily macro scores
    function calculatePotentials(): Potentials {

        return {
            strengthPotential: scores.protein,
            endurancePotential: scores.carbs,
            recoveryPotential: scores.calories
        };

        
    }

    const potentials = calculatePotentials();

    return {
        xpEarned,
        potential: potentials,
    
    };

};