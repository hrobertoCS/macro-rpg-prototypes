import { CharacterProvider } from '@/context/CharacterContext';
import { MacroProvider } from '@/context/MacroContext';
import {Tabs} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export default function Tablayout() {
  return (
    <GestureHandlerRootView style = {{flex: 1}}>
      <MacroProvider>
        <CharacterProvider>
          <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen name = "index" options = {{ title: 'Home'}} />
            <Tabs.Screen name = "shop" options= {{ title: 'Shop'}}/>
            <Tabs.Screen name = "settings" options= {{ title: 'Settings'}}/>
            <Tabs.Screen name = "character" options= {{title: 'Character'}}/>
            <Tabs.Screen name = "create-character" options = {{title: 'Create Character', href: null}} />
          </Tabs>
        </CharacterProvider>
      </MacroProvider>
    </GestureHandlerRootView>
    
  );

}
