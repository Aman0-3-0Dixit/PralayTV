import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Input, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import CalendarComponent from './calendar';
import DotSection from './dotSection';

export default function TopNavBar({ openSidebar }) {
  const navigation = useNavigation();

  const [isOptionsBoxVisible, setOptionsBoxVisible] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);

  const openOptionsBox = () => {
    setOptionsBoxVisible(true);
  };

  const closeOptionsBox = () => {
    setOptionsBoxVisible(false);
  };

  const handleSelectOption = (option) => {
    console.log('Selected option:', option);
    closeOptionsBox();
  };

  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const openCalendar = () => {
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const handleSearchPress = () => {
    setSearchActive(!isSearchActive);
  };

  const handleBackPress = () => {
    setSearchActive(false);
  };

  return (
    <Box safeAreaTop backgroundColor="#ffd700">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        p="4"
        borderBottomWidth={StyleSheet.hairlineWidth}
        borderBottomColor="gray.300"
        position="relative"
      >
        {isSearchActive ? (
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../screenAssets/leftarrow.png')} style={{ width: 21, height: 21, marginRight: 15 }} />
            </TouchableOpacity>
            <Input
              placeholder="Search"
              value=""
              onBlur={() => setSearchActive(false)}
              autoFocus
              style={styles.searchInput}
            />
          </HStack>
        ) : (
          <HStack alignItems="center">
            <TouchableOpacity onPress={openSidebar}>
              <Image source={require('../screenAssets/navpic.png')} style={{ width: 21, height: 21, left: 5 }} />
            </TouchableOpacity>
            <Heading size="md" left={'5'} color="black">PralayTV</Heading>
          </HStack>
        )}
        <HStack space={7} style={isSearchActive ? styles.hidden : null}>
        <TouchableOpacity onPress={handleSearchPress}>
            <Image source={require('../screenAssets/search.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCalendar}>
            <Image source={require('../screenAssets/calendar.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('../screenAssets/wifisignal.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('../screenAssets/television.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </HStack>
        <TouchableOpacity onPress={openOptionsBox}>
          <Image source={require('../screenAssets/dots.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </HStack>
      <CalendarComponent isVisible={isCalendarVisible} onClose={closeCalendar} />
      {isOptionsBoxVisible && (
        <DotSection onClose={closeOptionsBox} onSelectOption={handleSelectOption} />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1, 
    maxWidth: '70%',
  },
  backIcon: {
    marginRight: 10,
  },
  hidden: {
    opacity: 0,
  },
});

