import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';

// The tab navigator provides routes, screen options, navigation actions, and safe-area insets.
export default function FloatingDock({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  // Keep helper routes such as meal logging out of the dock.
  const visibleTabs = ['index', 'shop', 'settings', 'character'];
  // state.index identifies the currently selected route in the routes array.
  const activeRoute = state.routes[state.index];

  return (
    <View
      style={[
        styles.container,
        {
          // Reserve system gesture space, then add the visual gap around the dock.
          paddingBottom: insets.bottom + 12,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}
    >
      <View style={styles.dock}>
        {/* Filtering preserves navigator order; mapping creates one button per visible route. */}
        {state.routes
          .filter((route) => visibleTabs.includes(route.name))
          .map((route) => {
            const isActive = route.key === activeRoute.key;
            // Prefer the configured screen title and fall back to the route name.
            const label =
              descriptors[route.key].options.title ?? route.name;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                onPress={() => {
                  // Notify tab listeners first so they can prevent the screen change.
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isActive && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
                style={[
                  styles.button,
                  isActive && styles.activeButton,
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    isActive && styles.activeLabel,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1a25',
    paddingTop: 12,
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: '#2c2d35',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#414251',
    padding: 6,
  },
  // Equal flex values divide the available dock width evenly between buttons.
  button: {
    flex: 1,
    minHeight: 52,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#453028',
  },
  label: {
    color: '#a0a0b0',
    fontSize: 12,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#fc8a39',
  },
});
