import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import  BottomTab  from '../components/bottomTab';
import TopTab from '../components/topTab';
import Sidebar from '../components/sidebar';

export default function ArticlesScreen() {
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
            <View style={styles.infoContainer}></View>
            <View style={styles.infoContainer}></View>
            </SafeAreaView>

            <BottomTab focussedIndex={1} />
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Center horizontally
        padding: 15,
      },

      infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        width: '100%',
        height: '15%',
        resizeMode: 'cover',
        borderRadius: 15,
        alignItems: 'center', // Center horizontally
        padding: 20,
        zIndex: -1,
      },

});