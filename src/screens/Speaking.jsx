import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';
import { Audio } from 'expo-av';

const Speaking = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [showMicrophone, setShowMicrophone] = useState(false);
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) { }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);

  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  useEffect(() => {
    const getRandomImage = () => {
      const imagesArray = ObjectImages;
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      return imagesArray[randomIndex];
    };
    const randomImage = getRandomImage();
    setRandomImage(randomImage);
    const timeoutId = setTimeout(() => {
      setShowMicrophone(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View className="bg-gray-300 flex-1 justify-center items-center">
      {randomImage && (
        <>
          <View className="items-center justify-center">
            <Image source={randomImage} style={styles.image} />
          </View>
          <Text className="text-2xl font-bold">Place the correct object</Text>
        </>
      )}
      {showMicrophone && (
        <View style={styles.microphoneContainer}>
          <View style={styles.container}>
            <TouchableOpacity onPress={recording ? stopRecording : startRecording} >
              <Text className="text-3xl">{recording ? '🛑' : '🎤'}</Text>
            </TouchableOpacity>
            <Button title={recordings.length > 0 ? 'clear Recordings' : ''} onPress={clearRecordings} />
            {getRecordingLines()}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  microphoneContainer: {
    marginTop: 20,
  },
});

export default Speaking;
