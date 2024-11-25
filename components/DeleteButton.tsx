import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const DeleteButton = () => {
  const fillWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${fillWidth.value}%`,
    backgroundColor: 'red',
  }));

  const handlePressIn = () => {
    fillWidth.value = withTiming(100, {duration: 2000});
  };

  const handlePressOut = () => {
    fillWidth.value = withTiming(0, {duration: 300});
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}>
        <Animated.View style={[styles.fill, animatedStyle]} />
        <Text style={styles.text}>Delete</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    height: '100%',
    left: 0,
    top: 0,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1,
  },
});

export default DeleteButton;
