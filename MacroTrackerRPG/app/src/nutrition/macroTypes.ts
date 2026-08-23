
// Macro totals data used by progression calculations and
//shared by different app systems
export type MacroTotals = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number; 
};

// Macro goals used to compare with macro totals during
// progression calculations
export type MacroTargets = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

// Macro ratios representing how close totals are to 
// targets
export type MacroScores = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;

};

// Single day's entry of macro evaluation data. Entries are
// stored in macro history
export type MacroHistoryEntry = {
    date: string;
    targets: MacroTargets;
    totals: MacroTotals;
    scores: MacroScores;
    

};