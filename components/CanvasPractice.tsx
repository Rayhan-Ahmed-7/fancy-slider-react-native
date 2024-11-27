import React, {useEffect} from 'react';
import {Canvas, mix, Rect} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {vec} from '@shopify/react-native-skia';

const MyCanvas = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 3000}), -1, true);
  }, [progress]);

  const x = useDerivedValue(() => {
    return mix(progress.value, 0, 100);
  });

  return (
    <Canvas style={{flex: 1}}>
      <Rect x={x} y={100} width={10} height={10} color="red" />
    </Canvas>
  );
};

export default MyCanvas;
