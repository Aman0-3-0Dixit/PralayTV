import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const SignInModal = ({ isVisible, onClose, onRegisterPress }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>User not found. Please provide correct credentials.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRegisterPress} style={styles.registerButton}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  registerButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffd700',
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default SignInModal;
