import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Image, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';


const OtpInput = () => {
  const navigation = useNavigation();
  const handleAction = () => {
    navigation.navigate('videos');
  };

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpInput = (index, value) => {
    if (/^\d+$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
  
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1].focus();
      }
  
      setOtp(newOtp);
    } else if (value === '' && index > 0) {
      // Handle backspace
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      inputRefs.current[index - 1].focus();
      setOtp(newOtp);
    }
  };
  

  return (

    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always'
        keyboardVerticalOffset={-300}
    >

            <Image source={require('../screenAssets/pralaylogo.png')} style={{width: 100, height: 100, alignSelf: 'center', marginTop: 70}} />
            <Text style={{fontSize: 25, alignSelf: 'center'}}>PralayTV</Text>

    <View style={styles.container}>
        
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          value={digit}
          onChangeText={(value) => handleOtpInput(index, value)}
          keyboardType="numeric"
          maxLength={1}
          returnKeyType="next"
          blurOnSubmit={false}
          selectTextOnFocus
          onSubmitEditing={() => {
            if (index < 3) {
              inputRefs.current[index + 1].focus();
            }
          }}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </View>

    <Button style={styles.registerButton} onPress={handleAction} title='Enter Otp to login'><Text style={styles.text}>Enter Otp to login</Text>
    </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 100,
    padding: 10,
  },
  
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 7,
    textAlign: 'center',
    fontSize: 18,
  },

    registerButton: {
        width: 200,
        height:50,
        alignSelf: 'center',
        backgroundColor: '#ffd700',
        bottom: 120,
        borderRadius: 7,
        textAlign: 'center',
    },

    text: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#000',
        fontWeight: 'bold',
    },

});

export default OtpInput;


