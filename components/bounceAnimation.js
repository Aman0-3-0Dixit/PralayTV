import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppearingSplash = () => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.5)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const appearingAnimation = Animated.parallel([
      Animated.timing(opacityValue, { toValue: 2, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, friction: 2, useNativeDriver: true }),
    ]);

    appearingAnimation.start();

    const timeout = setTimeout(() => {
      navigation.replace('register');
    }, 3000);

    return () => {
      appearingAnimation.stop();
      clearTimeout(timeout);
    };
  }, [opacityValue, scaleValue, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../screenAssets/pralaylogo.png')}
        style={[
          styles.image,
          {
            opacity: opacityValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  image: {
    width: 200,
    height: 200, 
  },

});

export default AppearingSplash;
