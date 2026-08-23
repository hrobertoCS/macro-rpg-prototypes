import { calculateProgression } from "./progressionEngine";

const result = calculateProgression (
    {
        calories: 3000,
        protein: 200,
        carbs: 10,
        fat: 10,
    },
    {
        calories: 3000,
        protein: 200,
        carbs: 150,
        fat: 60,
    }
    

);
console.log(result);