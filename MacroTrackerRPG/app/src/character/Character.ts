import { ProgressionResult } from "@/progression/progressionTypes";

// Character class holding users character progression state
export class Character {
    level: number;
    xp: number;
    potentials: {
        strengthPotential: number;
        endurancePotential: number;
        recoveryPotential: number;
    }

    //creates a new character 
    constructor(
        level = 1,
        xp = 0,
    ) {
        this.level = level;
        this.xp = xp;

        this.potentials = {
            strengthPotential: 0,
            endurancePotential: 0,
            recoveryPotential: 0,
        };
    }


    applyProgression(result: ProgressionResult) {
        this.xp += result.xpEarned;
        this.potentials = result.potential;
    }
}