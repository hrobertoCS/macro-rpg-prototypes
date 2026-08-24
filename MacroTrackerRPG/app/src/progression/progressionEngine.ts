import { ProgressionResult, Potentials} from "./progressionTypes";
import { PROGRESSION_RULES } from "./progressionRules";
import { MacroTotals, MacroTargets} from "@/nutrition/macroTypes";


export function calculateProgression( 
    totals: MacroTotals,
    targets: MacroTargets,
): ProgressionResult {

    // Macro categories to loop over
    const macroCategories = ['calories', 'protein', 'carbs', 'fat'] as const;
    type macroCategory = typeof macroCategories[number]


    // List of ratios for each category
    const macroRatio = {} as Record<macroCategory, number>;

    for (const macro of macroCategories) {
        macroRatio[macro] = totals[macro] / targets[macro];
    }
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
    // Each pass over the list is O(n) time, O(n) space
    const scores = {} as Record<macroCategory, number>;
    for (const macro of macroCategories) {
        const thresholds = PROGRESSION_RULES.macroThresholds[macro];
        scores[macro] = calculateScore(
            macroRatio[macro],
            thresholds.minimum,
            thresholds.maximum,
            PROGRESSION_RULES.overTargetType[macro],
        )
    }


    //Apply weights to determine overall score to calculate XP
    let progressionScore = 0;

    for (const macro of macroCategories) {
        progressionScore += scores[macro] * PROGRESSION_RULES.macroWeights[macro];

    }


    
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
    // temporary calculation using daily macro scores
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