import {View, Text, StyleSheet} from 'react-native';
import {Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming} from 'react-native-reanimated';




export default function CharacterScreen() {
    const skillNodes = [
        { id: '1', name: 'Strength', x: 500, y: 300},
        { id: '2', name: 'Speed', x: 500, y: 700},
        { id: '3', name: 'defense', x: 700, y: 450},
    ];


    const scale = useSharedValue(.75);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const pinch = Gesture.Pinch()
        .onChange((event) => {
            scale.value *= event.scaleChange;
        });

    
    const pan = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

    const gestures = Gesture.Simultaneous(pinch, pan);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value},
            {translateY: translateY.value},
            {scale: scale.value},
        ],
    }));


    return (
        <View style = {styles.container}>
            <Text style = {styles.characterName}>Name</Text>
            <GestureDetector gesture = {gestures}>
                <Animated.View style = {[styles.skillTreeContainer, animatedStyle]}>
                    <View style = {styles.characterContainer}></View>
                    {skillNodes.map((node) => (
                        <View
                            key={node.id}
                            style={[styles.node, {left: node.x, top: node.y}]}
                        >
                            <Text style={styles.nodeText}>{node.name}</Text>
                        </View>
                 ) )}
                   
                </Animated.View>
            </GestureDetector>
        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#7cb9c4ff',
        alignItems: 'center',
        
    },
    characterName: {
        fontSize: 34,
        top: 60,
        fontWeight: 'bold',
        color: '#d2e1fbff',
        position: 'absolute',
        zIndex: 10,
  },
    skillTreeContainer: {
        width: 1000,
        height: 1000,
        borderRadius: 10,
        backgroundColor: '#7cb9c476',
        
        


    },
    characterContainer: {
        backgroundColor: 'rgba(117, 177, 199, 1)',
        width: 200,
        left: 400,
        top: 400,
        height: 200,
        borderRadius: 200,
        position: 'absolute',
        
    },
    node: {
        position: 'absolute',
        backgroundColor: 'rgba(117, 177, 199, 1)',
        padding: 10,
        borderRadius: 30,

    },
    nodeText: {
        fontSize: 12,
        color: '#fff',
    }
  
});