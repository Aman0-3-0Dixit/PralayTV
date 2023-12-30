import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, Image, TouchableWithoutFeedback } from 'react-native';
import { Box, HStack, Heading } from 'native-base';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Sidebar = ({ isOpen, closeSidebar }) => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link: ', err));
  };

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const sidebarTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0], // Adjust the value based on your desired sidebar width
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Allow dragging only when the sidebar is open
        if (isOpen && gestureState.dx < 0) {
          animation.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Close the sidebar if it was dragged more than half of its width
        if (isOpen && gestureState.dx < -150) {
          closeSidebar();
        } else {
          // Otherwise, animate it back to the closed position with a smoother spring animation
          Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: false,
            stiffness: 20, // Adjust stiffness for a smoother effect
            damping: 5, // Adjust damping for a smoother effect
          }).start();
        }
      },
    })
  ).current;

  return (
    <TouchableWithoutFeedback onPress={() => isOpen && closeSidebar()}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.container, { transform: [{ translateX: sidebarTranslateX }] }]}
      >
        <View style = {styles.header}>
          <Image source={require('../screenAssets/pralaylogo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Username</Text>
          <Text style={styles.headerText}>UserCount : 10000</Text>
        </View>
        
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('http://www.pralaytv.com/#Home/')}>
        <HStack
        >
          <Image source={require('../screenAssets/desktop.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>Web Version</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Navigate to screen 1')}>
        <HStack
        >
          <Image source={require('../screenAssets/coding.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>version-1.5.4</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Navigate to screen 1')}>
        <HStack
        >
          <Image source={require('../screenAssets/profile.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>My Profile</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://www.facebook.com/PralayTV/')}>
        <HStack
        >
          <Image source={require('../screenAssets/facebook.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>Facebook Page</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://twitter.com/pralaytv/')}>
        <HStack
        >
          <Image source={require('../screenAssets/twitter.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>Twitter Page</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://www.linkedin.com/company/pralay-tv/')}>
        <HStack
        >
          <Image source={require('../screenAssets/linkedin.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>LinkedIn Page</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://www.youtube.com/pralaytv')}>
        <HStack
        >
          <Image source={require('../screenAssets/youtube.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>YouTube Page</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://www.instagram.com/pralay_tv/')}>
        <HStack
        >
          <Image source={require('../screenAssets/instagram.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>Instagram Page</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('https://twitter.com/pralaytv/')}>
        <HStack
        >
          <Image source={require('../screenAssets/telephone.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>+91-0731-4200790</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => openLink('http://ipralaytv.com/#/ContactUs')}>
        <HStack
        >
          <Image source={require('../screenAssets/support.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>Contact Us</Text></HStack>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomDivider} onPress={() => openLink('http://ipralaytv.com/#/AboutUs')}>
        <HStack
        >
          <Image source={require('../screenAssets/group.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>About Us</Text></HStack>
        </TouchableOpacity>
        <Text style={{fontWeight:'700',color:'grey', left:20, top:5}}>Developed by NCS^ Pvt Ltd.</Text>
        <TouchableOpacity style={[styles.drawerItem, { top: 10 }]} onPress={() => openLink('https://www.nenosystems.com/')}>
        <HStack
        >
          <Image source={require('../screenAssets/web.png')} style={{height:24, width: 24, left:10}}  />
          <Text style={{fontWeight:'600', left:40}}>NCS^ Website</Text></HStack>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 300, // Adjust the value based on your desired sidebar width
    backgroundColor: '#fff',
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ffd700',
    width: '100%',
    height: 200,
  },
  logo: {
    top: 30,
    width: 82,
    height: 82,
  },
  headerText: {
    top: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    marginBottom: 16,
  },
  bottomDivider:{
    padding:12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  drawerItem: {
    padding: 13,
  },
});

export default Sidebar;







