import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import { useState } from "react";
import {useRouter} from "expo-router";
import { useMacros } from "@/context/MacroContext";
import { useCharacter } from "@/context/CharacterContext";
import { getDate } from "@/utils/date";
import { saveOpenLog } from "@/database/db";

export default function LogMeal() {
    const {current, addMeal} = useMacros();
    const router = useRouter();

    const {characterId} = useCharacter();

    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fat, setFat] = useState("");


    // Adds meal 
    // Values are validated before being added to days total
    async function handleAdd() {
        const meal = {
            calories: Number(calories),
            protein: Number(protein),
            carbs: Number(carbs),
            fat: Number(fat),
        };

        const validMeal = Object.values(meal).every(
            value => Number.isFinite(value) && value >=0
        );

        if (!validMeal) return;

        const newTotals = {
            calories: meal.calories + current.calories,
            protein: meal.protein + current.protein,
            carbs: meal.carbs + current.carbs,
            fat: meal.fat + current.fat,
        };


         // saveOpenLog cannnot contain null for characterId
        if (characterId === null) return;

        const date = getDate();

        // Persists current meals logged
        await saveOpenLog(characterId, date, newTotals);

        // Update UI
        addMeal(meal);

        router.back()
    }

    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Log a Meal</Text>

            <TextInput
                style = {styles.input}
                placeholder="Calories"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}/>
            <TextInput
                style = {styles.input}
                placeholder="Protein (g)"
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}/>
            <TextInput
                style = {styles.input}
                placeholder="Carbs (g)"
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs}/>
            <TextInput
                style = {styles.input}
                placeholder="Fat (g)"
                keyboardType="numeric"
                value={fat}
                onChangeText={setFat}/>

            <Button title= "Add Meal" onPress={handleAdd}/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#c2bfbfff",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,

    },
});