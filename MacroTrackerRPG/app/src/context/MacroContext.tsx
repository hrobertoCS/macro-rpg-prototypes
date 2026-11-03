import  {createContext, useContext, useState, useMemo, ReactNode,} from 'react';


export type MacroValues = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

type MacroContextValue = {
    current: MacroValues;
    goals: MacroValues | null;
    setTargets: (targets: MacroValues) => void;
    addMeal: (meal: MacroValues) => void;
    loadCurrentMacros: (current: MacroValues) => void;
    resetCurrentMacros: () => void;
    
};


const MacroContext = createContext<MacroContextValue | undefined>(undefined);

export function MacroProvider ({children}: {children: ReactNode}) {
    

    // Initial tracking state
    const [current, setCurrent] = useState<MacroValues>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    });

    // Target state
    const [goals, setGoals] = useState<MacroValues | null>(null);

    // Load user's current Macros from open session/log
    function loadCurrentMacros(current: MacroValues) {
        setCurrent(current);
    }

    function resetCurrentMacros() {
        setCurrent({
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        }
        );
    }

    // Set user's targets
    function setTargets(targets: MacroValues) {
        setGoals(targets);
    }

    // Adds a meal to daily totals
    function addMeal(meal: MacroValues) {
        setCurrent(previous => ({
            calories: previous.calories + meal.calories,
            protein: previous.protein + meal.protein,
            carbs: previous.carbs + meal.carbs,
            fat: previous.fat + meal.fat,
        }));
    }

    // Context value shared with components
    const value = useMemo( 
        () => ({ current, goals, setTargets, addMeal, loadCurrentMacros, resetCurrentMacros}),
        [current, goals, ]
     );

    
    

    return <MacroContext value ={value}>{children}</MacroContext>


}



export function useMacros() {
    const context = useContext(MacroContext);
    //error handler
    //catch useMacros being used outside of the provider before undefined causes a crash
    if (!context) {
        throw new Error('useMacros must be called within MacroProvider');

    }

    return context;
}