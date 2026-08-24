import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import {Link, useRouter} from 'expo-router';
import MacroStat from '@/components/MacroStat';
import XPBar from '@/components/XPBar';
import { useMacros } from '@/context/MacroContext';
import { useCharacter } from '@/context/CharacterContext';
import { calculateProgression } from '@/progression/progressionEngine';
import { saveDailyLog } from '@/database/db';


export default function HomeScreen() {

  const {current, goals} = useMacros();
  const {character, characterId, applyProgression} = useCharacter();
  const router = useRouter();
  if (!character || !goals) {
    return (
      <View style = {styles.container}>
        <Text style = {styles.title}>MacroTrackerRPG</Text>
        <Link href= "/create-character" asChild>
          <Pressable>
            <Text style = {styles.subtitle}>Create new character</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

 
  // Save logs to database and award XP
  async function finishDay() {
    if (characterId === null || !goals) return;

    const result = calculateProgression(current, goals);

    // ISO sorts as text to sort through date column
    const today = new Date().toISOString().split('T')[0];

    await saveDailyLog(characterId, today, current, result.xpEarned);
    await applyProgression(result);
  }


  
  
  return (
      <View style={styles.container}>
        <XPBar level={character.level} currentXP={character.xp} xpNeeded={character.xpForNextLevel()} style = {{position: 'absolute', top: '87%',}}/>
        <Text style={styles.title}>MacroTrackerRPG</Text>
        <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
        <View style={styles.macroContainer}>
          <MacroStat label='Calories' current={current.calories} goal={goals.calories} color = "#ff7818e0" style = {{position: 'absolute', top: '19%', left: '2%'
          }} />
          <MacroStat label='Protein' current={current.protein} goal={goals.protein} color = "#dd495dff" style = {{position: 'absolute', top: '21%', right: '2%'}} />
          <MacroStat label='Carbs' current={current.carbs} goal={goals.carbs} color = "#6b4dbeef" style = {{position: 'absolute', top: '50%', left: '2%'}} />
          <MacroStat label='Fat' current={current.fat} goal={goals.fat} color = "#2e997efa" style = {{position: 'absolute', top: '57%', right: '2%'}} />
        </View>
        <View style={{position: 'absolute', top: '78%', flexDirection: 'row', gap: 12}}>
          <Button title="Log Meal" onPress={() => router.push('/log-meal')} />
          <Button title="Finish Day" onPress={finishDay} />
        </View>
      </View>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1a25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    marginTop: 110,
    fontWeight: 'bold',
    color: '#fc8a39ff',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    marginTop: 15,
  },
  macroContainer: {
    marginTop: 80,
    flex: 1,
    backgroundColor: 'rgba(82, 67, 50, 1)',
    borderRadius: 300,
    width: '100%',
    marginBottom: 150,
    position: 'relative'
    

  },

});