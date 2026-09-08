import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import {Link, useRouter} from 'expo-router';
import MacroStat from '@/components/MacroStat';
import XPBar from '@/components/XPBar';
import { useMacros } from '@/context/MacroContext';
import { useCharacter } from '@/context/CharacterContext';
import { calculateProgression } from '@/progression/progressionEngine';
import { saveDailyLog } from '@/database/db';
import {getDate} from '@/utils/date';



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

    // Gets date
    const today = getDate();

    await saveDailyLog(characterId, today, current, result.xpEarned);
    await applyProgression(result);
  }


  
  
  return (
      <View style={styles.container}>
        <XPBar level={character.level} currentXP={character.xp} xpNeeded={character.xpForNextLevel()} style = {{position: 'absolute', top: '87%',}}/>
        <Text style={styles.title}>MacroTrackerRPG</Text>
        <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
        <View style={styles.macroContainer}>
            <MacroStat label='Calories'  textColor= '#cad3e4' variant='ring' current={current.calories} goal={goals.calories} color = 'rgba(245, 181, 91, 0.17)' style = {{position: 'absolute', top: '19%', left: '2%', 
            }} />
            <MacroStat label='Protein' textColor= '#cad3e4' variant='ring' current={current.protein} goal={goals.protein} color = 'rgba(65, 66, 87, 1)' style = {{position: 'absolute', top: '21%', right: '2%', borderRadius: 0,}} />
            <MacroStat label='Carbs' textColor= '#cad3e4' variant='ring' current={current.carbs} goal={goals.carbs} color = 'rgba(65, 66, 87, 1)' style = {{position: 'absolute', top: '50%', left: '2%'}} />
            <MacroStat label='Fat' textColor= '#cad3e4'  variant='ring'current={current.fat} goal={goals.fat} color = 'rgba(65, 66, 87, 1)' style = {{position: 'absolute', top: '57%', right: '2%'}} />
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
    backgroundColor: 'rgba(157, 159, 190, 0.58)',
    aspectRatio: 1,
    borderRadius: 9999,
    width: '80%',
    marginBottom: 150,
    position: 'relative'
    

  },

});