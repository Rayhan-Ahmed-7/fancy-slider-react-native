import React from 'react';
import {Pressable} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Canvas, Image, useAnimatedImageValue} from '@shopify/react-native-skia';
export const AnimatedImages = () => {
  const isPaused = useSharedValue(false);
  // This can be an animated GIF or WebP file
  const bird = useAnimatedImageValue(
    require('../assets/flying_bird.gif'),
    isPaused,
  );
  return (
    <Pressable onPress={() => (isPaused.value = !isPaused.value)}>
      <Canvas
        style={{
          width: 320,
          height: 180,
        }}>
        <Image
          image={bird}
          x={0}
          y={0}
          width={320}
          height={180}
          fit="contain"
        />
      </Canvas>
    </Pressable>
  );
};
