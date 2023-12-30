import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { NativeBaseProvider, Box, Center, Modal } from "native-base";
import { useNavigation } from '@react-navigation/native';
import  BottomTab  from '../components/bottomTab';
import TopTab from '../components/topTab';
import Sidebar from '../components/sidebar';
import VideoContainer from '../components/vidContainer';
import YoutubePlayer from "react-native-youtube-iframe";

export default function PlayListScreen() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

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
        keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
        keyboardVerticalOffset={-500}
        >
            <TopTab openSidebar={openSidebar} />
            <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
            <VideoContainer 
                            thumbnail={require('../screenAssets/news1.jpg')}
                            title="Video Title"
                            description="This is the video description."
                            onPress={handleVideoPress}
            /> 

            <VideoContainer 
                            thumbnail={require('../screenAssets/news1.jpg')}
                            title="Video Title"
                            description="This is the video description."
                            onPress={handleVideoPress}
            />
            </SafeAreaView>
            <BottomTab focussedIndex={2} />

            {/* Video Modal */}
            <Modal isOpen={isModalVisible} onClose={closeModal} size='full' >   
              <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>
              <Text style={{fontWeight:'bold', fontSize:18}}>Video Title</Text>
              </Modal.Header>
              <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={'jG2P0AyW1vM'}
                />
             </Modal.Content>
            </Modal>

            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
        alignItems: 'center', // Center horizontally
        zIndex: -1,
      },

      youtubePlayer: {
        alignSelf: 'center',
        height: 300,
      },

      modal: {
        backgroundColor: '#ffd700',
      },
});