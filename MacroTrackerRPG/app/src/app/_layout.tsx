import { CharacterProvider } from '@/context/CharacterContext';
import { MacroProvider } from '@/context/MacroContext';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavDock from '@/components/NavDock';

export default function Tablayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* CharacterProvider reads macro context, so MacroProvider must wrap it. */}
      <MacroProvider>
        <CharacterProvider>
          {/* The navigator supplies the route state and actions forwarded to our custom dock. */}
          <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <NavDock {...props} />}
          >
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
            <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
            <Tabs.Screen name="character" options={{ title: 'Character' }} />
            {/* These routes remain navigable without appearing as dock buttons. */}
            <Tabs.Screen
              name="create-character"
              options={{
                title: 'Create Character',
                href: null,
              }}
            />
            <Tabs.Screen
              name="log-meal"
              options={{
                title: 'Log Meal',
                href: null,
              }}
            />
          </Tabs>
        </CharacterProvider>
      </MacroProvider>
    </GestureHandlerRootView>
  );
}
