import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const DotSection = ({ onClose, onSelectOption }) => {

  const navigation = useNavigation();  
  const handleOutsidePress = () => {
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={[styles.container, { zIndex: 1 }]}>
        <TouchableOpacity style={styles.option} onPress={() => onSelectOption('Breaking News')}>
          <Text>Breaking News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => onSelectOption('Comments')}>
          <Text>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('login')}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 49, // Adjust the distance from the top
    right: 26, // Adjust the distance from the right
    borderColor: '#ffd700',
    borderWidth: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default DotSection;

