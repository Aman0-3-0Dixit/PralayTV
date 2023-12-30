import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import  BottomTab  from '../components/bottomTab';
import TopTab from '../components/topTab';
import Sidebar from '../components/sidebar';


export default function ListScreen() {
    const navigation = useNavigation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
        keyboardVerticalOffset={-500}
        >
            <TopTab openSidebar={openSidebar} />
            <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
            <Text>List page</Text>
            </SafeAreaView>
            <BottomTab focussedIndex={3} />
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        zIndex: -1,
      },

});