import { Text, StyleSheet, ViewStyle } from "react-native";
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, LinearTransition, FadeIn, FadeOut} from 'react-native-reanimated';
import {useState} from 'react';
import {scheduleOnRN} from 'react-native-worklets';


type MacroStatProps = {
    label: string;
    current: number;
    goal: number;
    style?: ViewStyle;
    color?: string; 
};

export default function MacroStat({label, current, goal, style, color}: MacroStatProps) {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isDragging = useSharedValue(false);
    const isActive = useSharedValue(false);
    const isPressed = useSharedValue(false);
    const [expandedByTap, setExpandedByTap] = useState(false);
    const [expandedByHold, setExpandedByHold] = useState(false);
    const [expandedByDrag, setExpandedByDrag] = useState(false);
    

    const pan = Gesture.Pan()
        .minDistance(5)
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
            
        })
        .onBegin(() => {
            isDragging.value = true;
            

        })
        .onStart(() => {
            scheduleOnRN(setExpandedByDrag, true);
        } )
        .onFinalize(() => {
            isDragging.value = false;
            scheduleOnRN(setExpandedByDrag, false);
        } )

    


    const tap = Gesture.Tap().onEnd(() => {
        scheduleOnRN(setExpandedByTap, (prev: boolean) => !prev);
        isActive.value = !isActive.value;
    });

    const longPress = Gesture.LongPress()
        .minDuration(500)
        .onStart(() => {
            scheduleOnRN(setExpandedByHold, true);
            isPressed.value = true;
        })
        .onFinalize(() => {
            scheduleOnRN(setExpandedByHold, false);
            isPressed.value = false;
        })

    
    

    const gestures = Gesture.Race(tap, Gesture.Simultaneous(pan, longPress));

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
            {scale: withSpring(isDragging.value || isActive.value || isPressed.value ? 1.1 : 1)},
        
        ],

        opacity: withTiming(isDragging.value || isActive.value || isPressed.value ? 1 : 0.4),
    }));

    




    return (
        <GestureDetector gesture = {gestures}>
            <Animated.View layout={LinearTransition} style = {[styles.container, {backgroundColor: color}, animatedStyle, style]}>
                <Text style = {styles.label}>{label}</Text>
                {(expandedByTap || expandedByDrag || expandedByHold ) && (<Animated.Text entering={FadeIn} exiting={FadeOut}  style = {styles.label}>{current} / {goal} </Animated.Text>)}
            </Animated.View>
        </GestureDetector>
    );

}

const styles = StyleSheet.create({ 

    label: {
    fontSize: 16,
    color: '#cecabf',
  },
  container: {
    backgroundColor: '#ff781880',
    borderRadius: 50,
    width: '28%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    

  },
})