import {Tabs} from 'expo-router';

export default function Tablayout() {
  return (
    <Tabs screenOptions={{ headerShown: false}}>
      <Tabs.Screen name = "index" options = {{ title: 'Home'}} />
      <Tabs.Screen name = "shop" options= {{ title: 'Shop'}}/>
      <Tabs.Screen name = "settings" options= {{ title: 'Settings'}}/>
    </Tabs>
  );

}
