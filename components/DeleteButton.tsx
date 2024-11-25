import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const DeleteButton = ({onClose, fillWidth}: any) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${fillWidth.value}%`,
    backgroundColor: '#6200ee',
  }));

  const handlePressIn = () => {
    fillWidth.value = withTiming(100, {duration: 2000});
  };

  const handlePressOut = () => {
    fillWidth.value = withTiming(0, {duration: 2000});
  };

  return (
    <>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}>
        <Animated.View style={[styles.fill, animatedStyle]} />
        <Text style={styles.text}>Delete</Text>
      </Pressable>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
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
  closeButton: {
    position: 'absolute',
    right: '0%',
    top: '20%',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  closeText: {
    color: '#333',
  },
});

export default DeleteButton;
