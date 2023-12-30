// Navigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VideosScreen from '../Screens/videos.js';
import Sidebar from './sidebar'; // Create a separate component for your sidebar

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="videos" component={VideosScreen} />
      {/* Add more screens if needed */}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
