import {View, Text, StyleSheet} from 'react-native';
import {Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import XPBar from '@/components/XPBar';
import MacroStat from '@/components/MacroStat';
import {  useMacros } from '@/context/MacroContext';




export default function CharacterScreen() {
    const {current, goals, level, currentXP, xpNeeded} = useMacros();
    const skillNodes = [
        { id: '1', name: 'Strength', x: 500, y: 300},
        { id: '2', name: 'Speed', x: 500, y: 700},
        { id: '3', name: 'defense', x: 700, y: 500},
        { id: 'center', name: '', x: 500, y: 500},
    ];

    const skillEdges = [
        {from: 'center', to: '1'},
        {from: 'center', to: '2'},
        {from: 'center', to: '3'},
    ]


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

                    <Svg style= {StyleSheet.absoluteFill} width = {1000} height = {1000}>
                        {skillEdges.map((edge) => {
                            const from = skillNodes.find((n) => n.id === edge.from);
                            const to = skillNodes.find((n) => n.id === edge.to);
                            if (!from || !to) return null;
                            return (
                                <Line 
                                    key = {`${edge.from}-${edge.to}`}
                                    x1={from.x} y1={from.y}
                                    x2={to.x} y2={to.y}
                                    stroke = "#ffffff80"
                                    strokeWidth={8}
                                />
                            )
                        })}
                    </Svg>
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
            <View style = {styles.macroContainer}>

                    <MacroStat label='Calories' current={current.calories} goal={goals.calories} color = 'rgba(65, 66, 87, 1)' draggable ={false} textColor='#ec9461ff' style={{width: '20%', marginRight: 25, marginLeft: 22, borderRadius: 5, }}/>
                    <MacroStat label='Protein' draggable={false} current={current.protein} goal={goals.protein} color = 'rgba(65, 66, 87, 1)' textColor='#fc6767ff' style={{width: '20%', marginRight: 25, borderRadius: 5,}} />
                    <MacroStat label='Fat' draggable={false} current={current.fat} goal={goals.fat} color = 'rgba(65, 66, 87, 1)' textColor='#faf49dff' style={{width: '20%', marginRight: 25, borderRadius: 5,}}/>
                    <MacroStat label='Carbs' draggable={false} current={current.carbs} goal={goals.carbs} color = 'rgba(65, 66, 87, 1)' textColor='#a2fe99ff' style={{width: '20%', marginRight: 25, borderRadius: 5,}}/>
            </View>
            <XPBar level={level} currentXP={currentXP} xpNeeded={xpNeeded} style = {{position: 'absolute', bottom: 40, width: '70%', zIndex: 10,}}/>
        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#a9a187ff',
        alignItems: 'center',
        
    },
    characterName: {
        fontSize: 34,
        top: 60,
        fontWeight: 'bold',
        color: '#2f4264ff',
        position: 'absolute',
        zIndex: 10,
  },
    skillTreeContainer: {
        width: 1000,
        height: 1000,
        borderRadius: 10,
        backgroundColor: '#a9a187ff',
        
        


    },
    characterContainer: {
        backgroundColor: 'rgba(65, 66, 87, 1)',
        width: 200,
        left: 500,
        top: 500,
        marginLeft: -100,
        marginTop: -100,
        height: 200,
        borderRadius: 200,
        position: 'absolute',
        
    },
    node: {
        position: 'absolute',
        backgroundColor: 'rgba(65, 66, 87, 1)',
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
        top: 120,
        position: 'absolute',
        zIndex: 10,
        paddingRight: 40,
    }
  
});