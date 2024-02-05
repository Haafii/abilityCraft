import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';

const Speaking = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [showMicrophone, setShowMicrophone] = useState(false);

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
          <Text style={styles.microphoneText}>🎤</Text>
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
  microphoneText: {
    fontSize: 30,
  },
});

export default Speaking;
