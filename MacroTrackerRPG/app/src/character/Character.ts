import { Potentials, ProgressionResult } from "@/progression/progressionTypes";
import { PROGRESSION_RULES } from "@/progression/progressionRules";


// Character class holding users character progression state
export class Character {
    name: string;
    level: number;
    xp: number;
    totalXPEarned: number;
    potentials: Potentials;


    // XP needed to reach next level
    // each level requires 1.5x the last
    private static xpNeeded(level: number): number{
        const {baseXP, levelMultiplier} = PROGRESSION_RULES.xp;
        return baseXP * Math.pow(levelMultiplier, level - 1);
    }

    // While current Xp meets the XP needed for next level 
    private checkLevelUp(): void {
        while (this.xp >= Character.xpNeeded(this.level)) {
            this.xp -= Character.xpNeeded(this.level);
            this.level += 1;
        }
    }

    //creates a new character 
    constructor(
        name: string,
        level = 1,
        xp = 0,
        totalXPEarned = 0,
        potentials: Potentials = {
            strengthPotential: 0,
            endurancePotential: 0,
            recoveryPotential: 0,
        },
    ) {
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.totalXPEarned = totalXPEarned;
        this.potentials = potentials;
        this.checkLevelUp();

        
    }

    

    // Apply progressions result and return new character
    // React can detect the change by comparing the object 
    // identity
    applyProgression(result: ProgressionResult): Character {
        return new Character(this.name, this.level, this.xp +
            result.xpEarned, 
            this.totalXPEarned + result.xpEarned,
            result.potential,
        );
    }

    // XP needed to level up
    // will be used for XP bar display
    xpForNextLevel(): number {
        return Character.xpNeeded(this.level);
    }
}