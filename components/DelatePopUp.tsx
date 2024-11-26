import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import DeleteButton from './DeleteButton';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export function DeletePopUp() {
  const [modalVisible, setModalVisible] = useState(false);
  const popupScale = useSharedValue(0);

  const openModal = () => {
    setModalVisible(true);
    popupScale.value = withSpring(1, {damping: 15, stiffness: 120});
  };

  const closeModal = () => {
    popupScale.value = withSpring(0, {duration: 200}, () => {
      runOnJS(setModalVisible)(false);
    });
  };

  const fillWidth = useSharedValue(0);
  const heightValue = useSharedValue(0); // Shared value for height
  const widthValue = useSharedValue(1);
  const animatedPopupStyle = useAnimatedStyle(() => ({
    transform: [{scale: popupScale.value}],
    borderColor: 'red',
  }));

  const animatedFillStyle = useAnimatedStyle(() => ({
    height: `${fillWidth.value}%`,
  }));

  const animatedBorderStyle = useAnimatedStyle(() => {
    heightValue.value = withSpring(fillWidth.value * 2, {
      damping: 10,
      stiffness: 100,
    });
    // Animate width after a delay
    widthValue.value = withSpring(fillWidth.value, {
      damping: 10,
      stiffness: 100,
    });

    return {
      height: `${heightValue.value}%`,
      width: `${widthValue.value}%`,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity style={styles.triggerButton} onPress={openModal}>
        <Text style={styles.triggerText}>Open Popup</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[animatedPopupStyle]}>
              <View style={styles.borderBox}>
                <Animated.View
                  style={[styles.leftBorder, animatedBorderStyle]}
                />
                <Animated.View
                  style={[styles.rightBorder, animatedBorderStyle]}
                />
                <Animated.View style={styles.popup}>
                  <Animated.View style={[styles.fill, animatedFillStyle]}>
                    <LinearGradient
                      colors={['rgba(160,40,40,0.4)', 'transparent']}
                      style={styles.gradient}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                    />
                  </Animated.View>
                  <View style={{padding: 15}}>
                    <View style={styles.warningBox}>
                      <View style={styles.deleteIcon}>
                        <Icon name="alert" size={30} color={'white'} />
                      </View>
                    </View>
                    <Text style={styles.popupTitle}>Delete Account</Text>
                    <Text style={styles.popupWarningText}>
                      Are you sure you want to delete your account?
                    </Text>
                    <DeleteButton fillWidth={fillWidth} />
                  </View>
                </Animated.View>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  triggerButton: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 10,
  },
  triggerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fill: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
  borderBox: {
    padding: 1,
    borderRadius: 10,
    // backgroundColor: 'red',
    overflow: 'hidden',
    position: 'relative',
  },
  leftBorder: {
    position: 'absolute',
    top: 4,
    width: 260,
    height: 250,
    transform: [{rotate: '0deg'}],
    transformOrigin: 'center',
    backgroundColor: 'rgba(160, 40, 40, 1)',
  },
  rightBorder: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 260,
    height: 250,
    transform: [{rotate: '0deg'}],
    transformOrigin: 'center',
    backgroundColor: 'rgba(160, 40, 40, 1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 2, 20, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  warningBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteIcon: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: 'rgba(160, 40, 40, 1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 260,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  popupTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  popupWarningText: {
    textAlign: 'center',
    color: '#e1e1e1',
    fontSize: 13,
    marginBottom: 20,
  },
  closeButton: {
    width: 260,
    height: 50,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
    color: '#e1e1e1',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
