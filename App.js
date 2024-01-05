import * as React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import VideosScreen from './Screens/videos.js';
import ArticlesScreen from './Screens/articles.js';
import PlayListScreen from './Screens/playList.js';
import ListScreen from './Screens/list.js';
import Register from './Screens/register.js';
import Login from './Screens/login.js';
import { NativeBaseProvider } from 'native-base';
import OtpInput from './Screens/otp.js';
import BouncingSplash from './components/bounceAnimation.js';


AppRegistry.registerComponent('main', () => App);  // a crucial addition in the project to expicitly define app registration when other dependecies was interfering in the automatic registration of the app component in the expo build AppEntry.js file

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splash'>
      <Stack.Screen name="splash" options={{ headerShown: false }} component={BouncingSplash} />
      <Stack.Screen name="videos" options={{ headerShown: false }} component={VideosScreen} />
      <Stack.Screen name="articles" options={{ headerShown: false }} component={ArticlesScreen} />
      <Stack.Screen name="playList" options={{ headerShown: false }} component={PlayListScreen} />
      <Stack.Screen name="list" options={{ headerShown: false }}  component={ListScreen} />
      <Stack.Screen name="register" options={{ headerShown: false }}  component={Register} />
      <Stack.Screen name="login" options={{ headerShown: false }}  component={Login} />
      <Stack.Screen name="otp" options={{ headerShown: false }}  component={OtpInput} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
