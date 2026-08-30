import {Canvas, Circle, vec, useCanvasSize, Path, Skia} from '@shopify/react-native-skia'; 
import type { ViewStyle} from 'react-native';
import { Group } from '@shopify/react-native-skia';

type MacroRingProps = {
    style?: ViewStyle;
    ringColor?: string;
    current: number;
    goal: number;
}

export default function MacroRing({ style, current, goal, ringColor}: MacroRingProps) {

    const strokeWidth = 7;
    const {ref, size} = useCanvasSize();

    const center = vec(
        size.width / 2,
        size.height / 2
    );

    const progress = Math.min(current / goal, 1);

    const radius = Math.min(size.width, size.height) / 2 - strokeWidth / 2;

    const circlePath = Skia.Path.Circle(
        center.x,
        center.y,
        radius
    )

    console.log({
        current, progress, goal, currenType: typeof current, goalType: typeof goal,
    });

    return (
        // Define a canvas size
        // Define a circle
        <Canvas ref={ref} style={style} >
            <Circle c={center} 
            r={radius} 
            color='#d7c7bf'
            style="stroke"
            strokeWidth={strokeWidth}/>
            { <Group
                origin={center}
                transform={[{scaleY: -1},{rotate: -Math.PI / 2}]}>
            <Path 
            path={circlePath}
            start={0}
            end={progress}
            style='stroke'
            color='#de9a39' 
            strokeWidth={strokeWidth} /> 
            </Group>}
        </Canvas>
    );
    

}