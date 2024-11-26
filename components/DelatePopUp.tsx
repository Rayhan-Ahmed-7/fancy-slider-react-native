import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import DeleteButton from './DeleteButton';
import {GestureHandlerRootView, Pressable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
export function DeletePopUp() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const fillWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${fillWidth.value}%`,
  }));
  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable style={styles.triggerButton} onPress={openModal}>
        <Text style={styles.triggerText}>Open Popup</Text>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.popup}>
            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>
                <Icon name="rocket" size={30} color="#900" />
              </Text>
            </Pressable>
            <Animated.View style={[styles.fill, animatedStyle]} />
            <View style={{padding: 20}}>
              <Text style={styles.popupTitle}>Are you sure?</Text>
              <DeleteButton fillWidth={fillWidth} />
            </View>
          </Animated.View>
        </View>
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
    borderRadius: 8,
  },
  triggerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fill: {
    position: 'absolute',
    backgroundColor: 'red',
    width: '100%',
    height: '20%',
    top: 0,
    left: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 300,
    backgroundColor: 'white',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    right: '4%',
    top: '10%',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  closeText: {
    color: '#333',
  },
});
