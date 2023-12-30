import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegistrationForm from '../components/registerForm';



export default function Register() {

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always' 
        keyboardVerticalOffset={-500}
        >
            <Image source={require('../screenAssets/pralaylogo.png')} style={{width: 100, height: 100, alignSelf: 'center', marginTop: 70}} />
            <Text style={{fontSize: 25, alignSelf: 'center'}}>PralayTV</Text>

            <RegistrationForm />

        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Center horizontally
        padding: 15,
      },

});