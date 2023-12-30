import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Box, Image, Pressable, Center } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';


const FirstRoute = () => <Center flex={1} my="4"></Center>;

const SecondRoute = () => <Center flex={1} my="4"></Center>;

const ThirdRoute = () => <Center flex={1} my="4"></Center>;

const FourthRoute = () => <Center flex={1} my="4"></Center>;


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});


const CustomTabComponent = ({ route, iconSource, isSelected, onPress }) => {

  const iconColor = isSelected ? 'black' : 'white';
  return (
    <Box alignItems="center">
      <Pressable onPress={onPress}>
        <Image source={iconSource} alt="" style={{ width: 37, height: 37, tintColor: iconColor }} />
      </Pressable>
    </Box>
     );
  };

const BottomTab = ({ focussedIndex }) => {
  const [routes] = React.useState([
    { key: 'first', title: 'Videos', iconSource: require('../screenAssets/videolibrarywhite.png'), navigTo: 'videos' },
    { key: 'second', title: 'Articles', iconSource: require('../screenAssets/newsletterwhite.png'), navigTo: 'articles' },
    { key: 'third', title: 'PlayList', iconSource: require('../screenAssets/musicwhite.png'), navigTo: 'playList' },
    { key: 'fourth', title: 'List', iconSource: require('../screenAssets/listwhite.png'), navigTo: 'list' },
  ]);

  const navigation = useNavigation();

  const handleTabPress = (newIndex) => {
    navigation.navigate(routes[newIndex].navigTo);
  };

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => (
          <Box key={route.key} flex={1} alignItems="center" p="2" cursor="pointer" height={12}>
            <CustomTabComponent
              iconSource={route.iconSource}
              isSelected={focussedIndex === i}
              onPress={() => handleTabPress(i)}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index: focussedIndex,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={() => {}}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        backgroundColor: '#ffd700',
      }}
    />
  );
};

export default BottomTab;
  
