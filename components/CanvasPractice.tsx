import React from 'react';
import {Canvas, Circle} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const MyCanvas = () => {
  // Calculate initial center position
  const initialCx = screenWidth / 2;
  const initialCy = screenHeight / 2;
  // Shared values for circle's position
  const x = useSharedValue(initialCx);
  const y = useSharedValue(initialCy);

  // Gesture handling
  const pan = Gesture.Pan()
    .onUpdate(e => {
      // Update position as the user drags
      x.value = e.translationX + initialCx; // Adjust with initial offset
      y.value = e.translationY + initialCy; // Adjust with initial offset
    })
    .onEnd(() => {
      // Add a spring animation to return to the initial position
      x.value = withSpring(initialCx);
      y.value = withSpring(initialCy);
    });

  // Derived values for the Skia canvas
  const skiaX = useDerivedValue(() => x.value);
  const skiaY = useDerivedValue(() => y.value);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={pan}>
        <Canvas style={{flex: 1, backgroundColor: 'black'}}>
          <Circle cx={skiaX} cy={skiaY} r={30} color="red" />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default MyCanvas;
