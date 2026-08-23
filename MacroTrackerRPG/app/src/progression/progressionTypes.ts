
// Progression data returned by progression engine
// after evaluating nutrition scores and calulating potential and xp
export type ProgressionResult = {
    xpEarned: number;
    potential: Potentials;
};

// Progression potential data evaluated by progression engine
export type Potentials = {
    strengthPotential: number;
    endurancePotential: number;
    recoveryPotential: number;
    
}
