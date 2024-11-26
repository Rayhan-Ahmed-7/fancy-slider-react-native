import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const DeleteButton = ({fillWidth}: any) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${fillWidth.value}%`,
    backgroundColor: 'rgba(198,40,40,1)',
  }));

  const handlePressIn = () => {
    fillWidth.value = withTiming(100, {duration: 1000});
  };

  const handlePressOut = () => {
    fillWidth.value = withTiming(0, {duration: 1000});
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}>
      <Animated.View style={[styles.fill, animatedStyle]} />
      <Text style={styles.text}>PRESS AND HOLD TO DELETE</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 230,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(198,40,40,.3)',
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
    zIndex: 1,
  },
});

export default DeleteButton;
