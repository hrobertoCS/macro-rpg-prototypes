import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MacroTrackerRPG</Text>
      <Text style={styles.subtitle}>{new Date().toLocaleDateString()}</Text>
      <View style={styles.macroContainer}>
        <View style = {styles.calorieTextContainer}>
          <Text style={styles.macroText}>Calories</Text>
        </View>
        <View style = {styles.proteinTextContainer}>
          <Text style={styles.macroText}>Protein</Text>
        </View>
        <View style = {styles.proteinTextContainer}>
          <Text style={styles.macroText}>Fat</Text>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    marginTop: 8,
  },
  macroContainer: {
    marginTop: 32,
    flex: 1,
    backgroundColor: '#34344cff',
    padding: 20,
    borderRadius: 200,
    width: '80%',
    marginBottom: 32,
    flexDirection: 'row',

  },
  macroText: {
    fontSize: 30,
    color: '#a0a0b0',
    marginBottom: 8,
  },
  calorieTextContainer: {
    backgroundColor: '#ff781838',
    borderRadius: 50,
    width: '20%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  proteinTextContainer: {
    backgroundColor: '#ff781838',
    borderRadius: 50,
    marginLeft: 390,
    marginTop: 15,
    width: '20%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    

  }

});