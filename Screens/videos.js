import React, { useState, useRef, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button} from 'react-native';
import { Box, Center, Modal } from "native-base";
import { useNavigation } from '@react-navigation/native';
import  BottomTab from '../components/bottomTab';
import TopTab from '../components/topTab';
import Sidebar from '../components/sidebar';
import VideoContainer from '../components/vidContainer';
import YoutubePlayer from "react-native-youtube-iframe";
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';



export default function VideosScreen() {

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [fetchedVideos, setFetchedVideos] = useState([]);

  const handleVideosFetch = videos => {
    setFetchedVideos(videos || []);
  };


  const renderVideoItem = ({ item }) => (
    <View style={styles.container}>
    <VideoContainer
      key={item.mediaid}
      thumbnail={{ uri: item.image }}
      title={item.title}
      description={item.description}
      onPress={handleVideoPress}
    />
    </View>
  );

  // function to fetch the videos in JWPlayer playlist according to the date selected , it will fetch all the videos uploaded till the selected date.
  const fetchVideos = async (selectedDate) => {
    try {
      console.log('in fetchVideos: '+ selectedDate);
      const currentDate = new Date();
      const selectedDateObj = new Date(selectedDate);
      console.log('in fetchVideos: '+ selectedDateObj);
      const differenceInDays = Math.floor((currentDate - selectedDateObj) / (1000 * 60 * 60 * 24));
  
      if (differenceInDays >= 0 && !isNaN(differenceInDays)) {
        const url = `https://cdn.jwplayer.com/v2/playlists/QEwoxnmQ?recency=${differenceInDays}D`;
  
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'TxswPXevop8wRzCl853JmmInVUdsV1F6UnVlRTVXY21Vd2RIUklkbHBqVTJWdVdXcFIn',
          },
        };
  
        console.log(differenceInDays);
        const response = await fetch(url, options);
  
        const data = await response.json();
        const updatedVideos = data?.playlist || [];
  
        // Resetting the video list with the new fetched videos
        setFetchedVideos(updatedVideos);
      } else {
        console.log('Invalid selected date:', selectedDate);
        return;
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  
  


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [playing, setPlaying] = useState(false);

  const handleVideoPress = () => {
    openModal();
    setPlaying(true);
  };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always'
        keyboardVerticalOffset={-500}
        >
            <TopTab openSidebar={openSidebar} onVideosFetch={handleVideosFetch} fetchVideos={fetchVideos} />
            <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
                    <FlatList
                         data={fetchedVideos}
                         renderItem={renderVideoItem}
                         keyExtractor={(item, index) => `${item.mediaid}-${index}`}
                         //onEndReachedThreshold={0.5}
                    />
            </SafeAreaView>

            <BottomTab focussedIndex={0} />

            <Modal isOpen={isModalVisible} onClose={closeModal} size='full' >   
              <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>
              <Text style={{fontWeight:'bold', fontSize:18}}>Video Title</Text>
              </Modal.Header>

                <WebView
                    source={{ uri: `https://www.youtube.com/embed/jG2P0AyW1vM` }}
                    style={{ height: 300 }}
                    originWhitelist={['https://*']}
                />

             </Modal.Content>
            </Modal>

            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

    container: {
        
        width: '100%',
        height: '50%',
        padding: 3,
        flexDirection: 'row',
        flexGrow: 1,
        flex: 1,
        alignItems: 'center',
        alignContent: 'flex-start',
        zIndex: -1,
      },

      youtubePlayer: {
        alignSelf: 'center',
        height: 300,
      },

      modal: {
        backgroundColor: '#ffd700',
      },

      sidebarContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 5,
      },

});

