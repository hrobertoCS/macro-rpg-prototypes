import  {createContext, useContext, useState, useMemo, ReactNode} from 'react';


type MacroValues = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};

type MacroContextValue = {
    current: MacroValues;
    goals: MacroValues;
    level: number;
    currentXP: number;
    xpNeeded: number;
}

const MacroContext = createContext<MacroContextValue | undefined>(undefined);

export function MacroProvider ({children}: {children: ReactNode}) {
    // TODO: Replace placeholder values with Typescript XP engine in enhancement two
    //setter functions will be added once xp logging is implemented
    const [current, setCurrent] = useState<MacroValues> ({calories: 123, protein: 12, carbs: 12, fat: 12})
    const [goals, setGoals] = useState<MacroValues>({calories: 2500, protein: 200, carbs: 80, fat: 70});
    const [level, setLevel] = useState(10);
    const [currentXP, setCurrentXP] = useState(1234);
    const [xpNeeded, setXpNeeded] = useState(4321);

    const value = useMemo( 
        () => ({ current, goals, level, currentXP, xpNeeded}),
        [current, goals, level, currentXP, xpNeeded]
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