import {View, Text, StyleSheet} from 'react-native';
import MacroStat from '@/components/MacroStat';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MacroTrackerRPG</Text>
      <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
      <View style={styles.macroContainer}>
        <MacroStat label='Calories' current={20} goal={2500} color = "#ff7818c5" style = {{position: 'absolute', top: '19%', left: '2%'
        }} />
        <MacroStat label='Protein' current={20} goal={200} color = "#dd495def" style = {{position: 'absolute', top: '21%', right: '2%'}} />
        <MacroStat label='Carbs' current={20} goal={70} color = "#6b4dbeef" style = {{position: 'absolute', top: '50%', left: '2%'}} />
        <MacroStat label='Fat' current={20} goal={60} color = "#2e997efa" style = {{position: 'absolute', top: '57%', right: '2%'}} />
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
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    marginTop: 15,
  },
  macroContainer: {
    marginTop: 80,
    flex: 1,
    backgroundColor: 'rgba(82, 67, 50, 0.85)',
    borderRadius: 200,
    width: '100%',
    marginBottom: 150,
    position: 'relative'
    

  },

});