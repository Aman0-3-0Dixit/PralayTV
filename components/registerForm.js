import React, { useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Input, Button, View, Select, CheckIcon, WarningOutlineIcon, Center, FormControl } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const RegistrationForm = ({ isLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [assistant, setAssistant] = useState('');
  const navigation = useNavigation();

  const handleAction = () => {
    if (isLogin) {
      // Handle login logic here
      navigation.navigate('otp');
    } else {
      // Handle registration logic here
      navigation.navigate('login');
    }
  };

  return (
    <Center>
      <FormControl maxW="350" margin={'5'}  top={10} isRequired>
        {!isLogin && (
          <>
            <Input
              style={styles.input}
              placeholder="First Name*"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Input
              style={styles.input}
              placeholder="Last Name*"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Select
              style={styles.input}
              minWidth="200"
              accessibilityLabel="Choose Gender"
              placeholder="Select Gender"
              value={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
              <Select.Item label="Prefer Not to Say" value="Prefer Not to Say" />
            </Select>
            <Input
              style={styles.input}
              placeholder="Assister"
              value={assistant}
              onChangeText={(text) => setAssistant(text)}
            />
          </>
        )}

        <Input
          style={styles.input}
          placeholder="Mobile No.*"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
        />
        <Input
          style={styles.input}
          placeholder="Email*"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
    </Center>
  );
};

const styles = StyleSheet.create({
  
  input: {
    marginBottom: 18,
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

