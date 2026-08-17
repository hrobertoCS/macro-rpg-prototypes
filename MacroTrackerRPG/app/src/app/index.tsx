import {View, Text, StyleSheet} from 'react-native';
import MacroStat from '@/components/MacroStat';
import XPBar from '@/components/XPBar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <XPBar level={10} currentXP={500} xpNeeded={1500} style = {{position: 'absolute', top: '87%',}}/>
      <Text style={styles.title}>MacroTrackerRPG</Text>
      <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
      <View style={styles.macroContainer}>
        <MacroStat label='Calories' current={20} goal={2500} color = "#ff7818e0" style = {{position: 'absolute', top: '19%', left: '2%'
        }} />
        <MacroStat label='Protein' current={20} goal={200} color = "#dd495dff" style = {{position: 'absolute', top: '21%', right: '2%'}} />
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