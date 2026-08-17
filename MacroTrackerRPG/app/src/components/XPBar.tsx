import {Text, View, ViewStyle, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming, LinearTransition, FadeIn, FadeOut} from 'react-native-reanimated';
import {useState} from 'react';
import {scheduleOnRN} from 'react-native-worklets';


type XPBarProps = {
    level: number,
    currentXP: number,
    xpNeeded: number,
    style?: ViewStyle,
}
export default function XPBar({level, currentXP, xpNeeded, style}: XPBarProps) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isTapped = useSharedValue(false);
    const [expandedByTap, setExpandedByTap] = useState(false);

    const tap = Gesture.Tap().onEnd(() => {
        scheduleOnRN(setExpandedByTap, (prev: boolean) => !prev);
        isTapped.value = !isTapped.value;
    })

    
        
    
    

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
            {scale: withSpring( isTapped.value ? 1.1 : 1)}

        ]

    }));

    return (
        <GestureDetector gesture ={tap}>
            <Animated.View layout = {LinearTransition} style = {[styles.container, animatedStyle, style ]}>
                <View style={styles.textGroup}>
                    <Text style = {styles.xpText}> LVL{level}</Text>
                    { expandedByTap  && (<Animated.Text entering={FadeIn} exiting={FadeOut} style = {styles.xpText}>{currentXP} / {xpNeeded}</Animated.Text>)}
                    
                </View>
                <View style = {styles.track}>
                    <View style={[styles.fill, {width: `${(currentXP / xpNeeded) * 100}%`, height: '100%'}]}></View>
                </View>
            </Animated.View>
        </GestureDetector>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c2d35ff',
        borderRadius: 20,
        width: '70%',
        padding: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',


    },
    textGroup: {
        marginRight: 10,
        width: 90,

    },

    xpText: {
        color: '#dde5ddff',
        fontSize: 15,
        fontWeight: 'bold',
        
        
    },
    track: {
        flex: 1,
        minWidth: 0,
        height: 15,
        backgroundColor: '#021b04ff',
        borderRadius: 50,
        
        
    },
    fill: {
        backgroundColor: '#34c040ff',
        borderRadius: 50,
    }
})