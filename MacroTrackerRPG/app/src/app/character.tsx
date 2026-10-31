import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, clamp, withTiming, cancelAnimation } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import XPBar from '@/components/XPBar';
import MacroStat from '@/components/MacroStat';
import { useMacros } from '@/context/MacroContext';
import { useCharacter } from '@/context/CharacterContext';

// Pinching stays inside this range and snaps to increments of ZOOM_STEP.
const MIN_ZOOM = 0.50;
const MAX_ZOOM = 1.50;
const ZOOM_STEP = 0.25;

export default function CharacterScreen() {
  const { current, goals } = useMacros();
  const { character } = useCharacter();
  // Node coordinates use the fixed 500 x 500 tree canvas; center anchors the connecting lines.
  const skillNodes = [
    { id: '1', name: 'Strength', x: 250, y: 50 },
    { id: '2', name: 'Speed', x: 250, y: 450 },
    { id: '3', name: 'defense', x: 450, y: 250 },
    { id: 'center', name: '', x: 250, y: 250 },
  ];

  const skillEdges = [
    { from: 'center', to: '1' },
    { from: 'center', to: '2' },
    { from: 'center', to: '3' },
  ];

  // Shared values connect gesture updates to animated transforms without React state updates.
  const scale = useSharedValue(.75);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const viewportWidth = useSharedValue(0);
  const viewportHeight = useSharedValue(0);

  // Interrupt an unfinished snap, limit live zoom, then animate to the nearest zoom stop.
  const pinch = Gesture.Pinch()
    .onStart(() => {
      cancelAnimation(scale);
    })
    .onChange((event) => {
      scale.value = clamp(
        scale.value * event.scaleChange,
        MIN_ZOOM, MAX_ZOOM
      );
    })
    .onEnd(() => {
      const nearestZoom = Math.round(scale.value / ZOOM_STEP) * ZOOM_STEP;

      scale.value = withTiming(nearestZoom, {
        duration: 180,
      });
    });

  // Derive drag limits from the measured viewport and the zoomed character circle.
  const pan = Gesture.Pan()
    .onChange((event) => {
      const radius = 100 * scale.value;
      const limitX = Math.max(0, viewportWidth.value / 2 - radius);
      const limitY = Math.max(0, viewportHeight.value / 2 - radius);
      translateX.value = clamp(
        translateX.value + event.changeX, - limitX, limitX
      );
      translateY.value = clamp(
        translateY.value + event.changeY, -limitY, limitY
      );
    });

  const gestures = Gesture.Simultaneous(pinch, pan);

  // Reapply the bounds during zooming, even when no drag event is firing.
  const animatedStyle = useAnimatedStyle(() => {
    const radius = 100 * scale.value;
    const limitX = Math.max(0, viewportWidth.value / 2 - radius);
    const limitY = Math.max(0, viewportHeight.value / 2 - radius);

    return {
      transform: [
        {
          translateX: clamp(
            translateX.value, -limitX, limitX
          ),
        },
        {
          translateY: clamp(
            translateY.value, -limitY, limitY
          ),
        },
        { scale: scale.value },
      ]
    };
  });

  // Screen if no character exists yet
  if (!character || !goals) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No character</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{character.name}</Text>
      <View style={styles.macroContainer}>

        <MacroStat
          label='Calories'
          current={current.calories}
          goal={goals.calories}
          color='rgba(65, 66, 87, 1)'
          draggable={false}
          textColor='#ec9461ff'
          style={{
            width: '20%',
            marginRight: 25,
            marginLeft: 22,
            borderRadius: 5,
          }}
        />
        <MacroStat
          label='Protein'
          draggable={false}
          current={current.protein}
          goal={goals.protein}
          color='rgba(65, 66, 87, 1)'
          textColor='#fc6767ff'
          style={{
            width: '20%',
            marginRight: 25,
            borderRadius: 5,
          }}
        />
        <MacroStat
          label='Fat'
          draggable={false}
          current={current.fat}
          goal={goals.fat}
          color='rgba(65, 66, 87, 1)'
          textColor='#faf49dff'
          style={{
            width: '20%',
            marginRight: 25,
            borderRadius: 5,
          }}
        />
        <MacroStat
          label='Carbs'
          draggable={false}
          current={current.carbs}
          goal={goals.carbs}
          color='rgba(65, 66, 87, 1)'
          textColor='#a2fe99ff'
          style={{
            width: '20%',
            marginRight: 25,
            borderRadius: 5,
          }}
        />
      </View>
      {/* Measure the viewing area separately from the tree that moves inside it. */}
      <View
        style={styles.skillTreeViewport}
        onLayout={(event) => { { viewportWidth.value = event.nativeEvent.layout.width; viewportHeight.value = event.nativeEvent.layout.height; } }}
      >
        <GestureDetector gesture={gestures}>
          <Animated.View style={[styles.skillTreeContainer, animatedStyle]}>

            <Svg
              style={StyleSheet.absoluteFill}
              width={500}
              height={500}
            >
              {skillEdges.map((edge) => {
                const from = skillNodes.find((n) => n.id === edge.from);
                const to = skillNodes.find((n) => n.id === edge.to);
                if (!from || !to) return null;
                return (
                  <Line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#ffffff80"
                    strokeWidth={8}
                  />
                );
              })}
            </Svg>
            <View style={styles.characterContainer}></View>
            {skillNodes.map((node) => (
              <View
                key={node.id}
                style={[styles.node, { left: node.x, top: node.y }]}
              >
                <Text style={styles.nodeText}>{node.name}</Text>
              </View>
            ))}
          </Animated.View>
        </GestureDetector>
      </View>
      <XPBar
        level={character.level}
        currentXP={character.xp}
        xpNeeded={character.xpForNextLevel()}
        style={{
          width: '70%',
          flexShrink: 0,
          marginVertical: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1a25',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 34,
    top: 60,
    fontWeight: 'bold',
    color: '#fc8a39ff',
  },
  skillTreeContainer: {
    width: 500,
    height: 500,
    borderRadius: 10,
    backgroundColor: '#1f1a25',
  },
  // Fill the remaining screen space and clip tree content outside the viewing area.
  skillTreeViewport: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  characterContainer: {
    backgroundColor: 'rgb(157, 159, 190)',
    width: 200,
    left: 250,
    top: 250,
    marginLeft: -100,
    marginTop: -100,
    height: 200,
    borderRadius: 200,
    position: 'absolute',
  },
  node: {
    position: 'absolute',
    backgroundColor: 'rgb(157, 159, 190)',
    padding: 10,
    borderRadius: 30,
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -60,
    marginTop: -25,
  },
  nodeText: {
    fontSize: 22,
    color: '#fff',
  },
  macroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginTop: 80,
    marginBottom: 16,
    paddingRight: 40,
    flexShrink: 0,
  },

  title: {
    fontSize: 34,
    top: 60,
    fontWeight: 'bold',
    color: '#2f4264ff',
    position: 'absolute',
    zIndex: 10,
  }
});
