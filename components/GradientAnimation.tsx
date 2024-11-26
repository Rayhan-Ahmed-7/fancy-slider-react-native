import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Animated} from 'react-native';

const AnimatedBorderBox = () => {
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // Interpolate rotation to get string values for the transform
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.centerBox}>
      <View style={styles.container}>
        {/* Glowing Animated Border */}
        <Animated.View
          style={[styles.animatedBorderGlow, {transform: [{rotate}]}]}>
          <LinearGradient
            colors={['green', 'red', 'blue']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
        </Animated.View>

        {/* Inner Box */}
        <View style={styles.innerBox} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerBox: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 250,
    height: 200,
    backgroundColor: '#red',
    overflow: 'hidden',
    borderRadius: 10,
  },
  container: {
    position: 'relative',
    width: 240,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBorderGlow: {
    position: 'absolute',
    width: '180%',
    height: '180%',
    zIndex: 0,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'transparent',
  },
  innerBox: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    backgroundColor: '#292a2e',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    zIndex: 1,
  },
});

export default AnimatedBorderBox;
