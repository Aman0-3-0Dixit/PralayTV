import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {parse} from 'date-fns';

export default function CalendarComponent({ isVisible, onClose, onDateSelect, fetchVideos }) {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
  
    useEffect(() => {
      // Initializing marked date with the current date
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      setSelectedDate(formattedDate);
      setMarkedDates({ [formattedDate]: { selected: true, marked: true } });
     }, []);
  
     const handleDateSelect = async (date) => {
        try {
          // Checking if date.dateString is a valid date string
          if (!date.dateString) {
            console.error('Invalid selected date:', date);
            return;
          }
      
          // Getting the selected date as a string
          const selectedDateString = date.dateString;
      
          // Getting the current date
          const currentDate = new Date();
      
          // Parse the selected date as a Date object
          const selectedDateObj = parse(selectedDateString, 'yyyy-MM-dd', new Date());
      
          // Checking if selectedDateObj is a valid Date
          if (isNaN(selectedDateObj.getTime())) {
            console.error('Invalid selected date:', selectedDateString);
            return;
          }
      
          // Calculating the difference in days
          const differenceInDays = Math.floor(
            (currentDate - selectedDateObj) / (1000 * 60 * 60 * 24)
          );
      
          console.log('Selected date:', selectedDateString);
          console.log('Difference in days:', differenceInDays);
      
          // Calling fetchVideos with the selected date
          await fetchVideos(selectedDateString);
        } catch (error) {
          console.error('Error handling date selection:', error);
        }
      };
  
    return (
      <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar markedDates={markedDates} onDayPress={handleDateSelect} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffd700',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },

});


