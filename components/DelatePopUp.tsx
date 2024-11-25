import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import DeleteButton from './DeleteButton';
// solves the cache issue
// npx react-native start --reset-cache
const {width} = Dimensions.get('screen');
const _imageWidth = width * 0.7;
const _imageHeight = width * 1.76;
const _spacing = 12;

export function DeletePopUp() {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  return (
    <View style={styles.centered}>
      <DeleteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
