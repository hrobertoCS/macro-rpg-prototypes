import {Tabs} from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Tablayout() {
  return (
    <GestureHandlerRootView style = {{flex: 1}}>
      <Tabs screenOptions={{ headerShown: false}}>
        <Tabs.Screen name = "index" options = {{ title: 'Home'}} />
        <Tabs.Screen name = "shop" options= {{ title: 'Shop'}}/>
        <Tabs.Screen name = "settings" options= {{ title: 'Settings'}}/>
      </Tabs>
    </GestureHandlerRootView>
  );

}
