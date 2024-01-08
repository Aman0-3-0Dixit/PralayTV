import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, TextInput, View } from 'react-native';
import { Input, Button, Select, CheckIcon, WarningOutlineIcon, Center, FormControl } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import SignInModal from './signInModal';

const RegistrationForm = ({ isLogin }) => {

    const [isSignInModalVisible, setSignInModalVisible] = useState(false);

    const handleSignIn = async () => {
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

  const calculatePasswordStrength = (password) => {
  
    const minLength = 8;
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      return 'Weak: Password should be at least 8 characters long';
    }
  
    if (!hasDigit) {
      return 'Weak: Password should contain at least one digit';
    }
  
    if (!hasSpecialChar) {
      return 'Weak: Password should contain at least one special character';
    }
  
    return 'Strong';

  };
  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [gender, setGender] = useState('');
  const [emailId, setEmail] = useState('');
  const [assister, setAssister] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');


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

    // Checking password strength and updating the state accordingly
    const strength = calculatePasswordStrength(newText);
    setPasswordStrength(strength);
  };

  const passwordConfirmSet = (newText) => {
    newText = truncateText(newText, 20);
    setConfirmPassword(newText);
  };

  const handleAction  = async () => {

    if (isLogin) {
      // Handling login logic here
      const loginRequiredFields = [mobileNo, emailId, password];

      if (loginRequiredFields.some(field => !field)) {
        alert('Please fill in all required fields');
        return;
      }
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
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (passwordStrength.includes('Weak')) {
        alert('Password is weak');
        return;
      }

      const registerRequiredFields = [firstName, lastName, gender, mobileNo, emailId, password];
      
      if (registerRequiredFields.some(field => !field)) {
        alert('Please fill in all required fields');
        return;
      }

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
        console.log(data);
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

        {!isLogin && (
            <>
            <Input
                style={styles.input}
                placeholder="Confirm Password*"
                keyboardType="default"
                value={confirmPassword}
                onChangeText={passwordConfirmSet}
            />

            {password !== '' &&
           <Text style={{ color: passwordStrength.includes('Weak') ? 'red' : 'green' }}>
                Password Strength: {passwordStrength}
           </Text>
            }

            </>
            )
        }


        <Button block style={styles.registerButton} onPress={handleAction} disabled={passwordStrength.includes('Weak')}>
              {isLogin ? 'Login' : 'Register'}
        </Button>

        <Pressable onPress={() => navigation.navigate(isLogin ? 'register' : 'login')}>
          <Text style={styles.loginText}>
            If you have an account, <Text style={styles.linkText}>{isLogin ? 'click here to register' : 'click here to login'}</Text>
          </Text>
        </Pressable>
      </FormControl>

      {/* signIn modal condition to display on the login screen after an unsuccessful attempt at signing in */}

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

