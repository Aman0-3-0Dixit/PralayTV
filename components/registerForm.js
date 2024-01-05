import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, TextInput, View } from 'react-native';
import { Input, Button, Select, CheckIcon, WarningOutlineIcon, Center, FormControl } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import SignInModal from './signInModal';

const RegistrationForm = ({ isLogin }) => {

    const [isSignInModalVisible, setSignInModalVisible] = useState(false);

    const handleSignIn = async () => {
      // Make your API request
  
      // If user not found, show the modal
      setSignInModalVisible(true);
    };
  
    const closeSignInModal = () => {
      setSignInModalVisible(false);
    };
  
    const handleRegisterPress = () => {
        navigation.navigate('register');
    };

  function truncateText(text, maxLength) {
        if (text.length > maxLength) {
           return text.substring(0, maxLength) ;
         }
         return text;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [gender, setGender] = useState('');
  const [emailId, setEmail] = useState('');
  const [assister, setAssister] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const nameFirstSet = (newText) => {
    newText = truncateText(newText, 50);
    setFirstName(newText);
  };

  const nameLastSet = (newText) => {
    newText = truncateText(newText, 50);
    setLastName(newText);
  };

  const mobileNoSet = (newText) => {
    newText = truncateText(newText, 10);
    setMobileNo(newText);
  };

  const genderSet = (newText) => {
    newText = truncateText(newText, 50);
    setGender(newText);
  };

  const emailSet = (newText) => {
    newText = truncateText(newText, 50);
    setEmail(newText);
  }

  const assisterSet = (newText) => {
    newText = truncateText(newText, 50);
    setAssister(newText);
  }

  const passwordSet = (newText) => {
    newText = truncateText(newText, 20);
    setPassword(newText);
  };

  const passwordConfirmSet = (newText) => {
    newText = truncateText(newText, 20);
    setConfirmPassword(newText);
  };

  const handleAction  = async () => {

    if (isLogin) {
      // Handle login logic here

      try {
        console.log('Logging in user:');
        const response = await fetch('http://192.168.1.127:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileNo,
                emailId,
                password,
            }),
            });

            const data = await response.json();
            console.log(data);

            if(response.status === 200) {
                navigation.navigate('videos');
            }

            else {
                setSignInModalVisible(true);
            }

      } catch (error) {
        console.log('Error logging :', error);
        setSignInModalVisible(true);
      }

    } 
    
    else {
      // Handling registration logic here
      try {
        console.log('Registering user:');
        const response = await fetch('http://192.168.1.127:3000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            gender,
            assister,
            mobileNo,
            emailId,
            password,
          }),
        });
    
        const data = await response.json();
        console.log(data); // Log the response from the server
        navigation.navigate('login');
      } catch (error) {
        console.error('Error registering:', error);
      }
    }
  };

  return (
    <Center>
      <FormControl maxW="350" margin={'5'}  top={3} isRequired>
        {!isLogin && (
          <>
            <Input
              style={styles.input}
              placeholder="First Name*"
              keyboardType='default'
              value={firstName}
              onChangeText={nameFirstSet}
            />
            <Input
              style={styles.input}
              placeholder="Last Name*"
              keyboardType='default'
              value={lastName}
              onChangeText={nameLastSet}
            />
            <Select
              style={styles.input}
              minWidth="200"
              accessibilityLabel="Choose Gender"
              placeholder="Select Gender"
              value={gender}
              onValueChange={genderSet}
            >
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
              <Select.Item label="Prefer Not to Say" value="Prefer Not to Say" />
            </Select>
            <Input
              style={styles.input}
              placeholder="Assister"
              keyboardType="default"
              value={assister}
              onChangeText={assisterSet}
            />
          </>
        )}

        <Input
          style={styles.input}
          placeholder="Mobile No.*"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={mobileNoSet}
        />
        <Input
          style={styles.input}
          placeholder="Email*"
          keyboardType="default"
          value={emailId}
          onChangeText={emailSet}
        />
        <Input
          style={styles.input}
          placeholder="Password*"
          keyboardType="default"
          value={password}
          onChangeText={passwordSet}
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password*"
          keyboardType="default"
          value={confirmPassword}
          onChangeText={passwordConfirmSet}
        />

        <Button block style={styles.registerButton} onPress={handleAction}>
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Pressable onPress={() => navigation.navigate(isLogin ? 'register' : 'login')}>
          <Text style={styles.loginText}>
            If you have an account, <Text style={styles.linkText}>{isLogin ? 'click here to register' : 'click here to login'}</Text>
          </Text>
        </Pressable>
      </FormControl>

      {/* signIn modal condition to display on the login screen after the */}
        {isSignInModalVisible && (
            <SignInModal
                isVisible={isSignInModalVisible}
                onClose={closeSignInModal}
                onRegisterPress={handleRegisterPress}
            />
        )}
    </Center>
  );
};

const styles = StyleSheet.create({
  
  input: {
    marginBottom: 5,
    backgroundColor: '#f2f2f2',
    fontSize: 15,
  },

  registerButton: {
    top: 15,
    backgroundColor: '#ffd700',
    marginTop: 10,
    borderRadius: 5,
  },

  loginTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  loginText: {
    marginTop: 28,
    textAlign: 'center',
  },

  linkText: {
    color: 'blue',
  },

});

export default RegistrationForm;

