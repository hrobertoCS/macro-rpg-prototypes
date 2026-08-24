import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import {useState} from "react";
import { useRouter } from "expo-router";
import {useMacros} from "@/context/MacroContext";
import { useCharacter } from "@/context/CharacterContext";

export default function CreateCharacter() {

    // Set initial macro targets
    const {setTargets} = useMacros();
    const {createCharacter} = useCharacter();
    const router =useRouter();

    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fat, setFat] = useState("");


    // Convert string inputs into numbers
    async function handleCreate() {
        const targets = {
            calories: Number(calories),
            protein: Number(protein),
            carbs: Number(carbs),
            fat: Number(fat),
        };
    

        // input validation
        const validName = name.trim().length > 0;
        const validTargets = Object.values(targets).every(
            value => Number.isFinite(value) && value >0
        );

        if (!validName || !validTargets) return;

        await createCharacter(name.trim(), targets);
        router.replace("/")
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Create New Character</Text>

            <TextInput 
                autoComplete="off"
                importantForAutofill="no"
                style = {styles.input}
                placeholder="Character Name"
                value={name}
                onChangeText={setName} />
            <TextInput
                style = {styles.input}
                placeholder="Target Calories"
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories} />
            <TextInput
                style = {styles.input}
                placeholder="Target Protein (g)"
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein} />
            <TextInput
                style = {styles.input}
                placeholder="Target Carbs (g)"
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs} />
            <TextInput
                style = {styles.input}
                placeholder="Target Fat (g)"
                keyboardType="numeric"
                value={fat}
                onChangeText={setFat} />

            <Button title= "Create Character" onPress= {handleCreate}/>

            
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#929090ff",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12

    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});