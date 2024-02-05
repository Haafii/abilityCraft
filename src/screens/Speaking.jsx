import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';

export default function Speaking() {
  const [randomImage, setRandomImage] = useState(null);
  const [showMicrophone, setShowMicrophone] = useState(false);

  useEffect(() => {
    // Function to get a random image from ObjectImages
    const getRandomImage = () => {
      const imagesArray = ObjectImages; // Assuming ObjectImages is an array of image paths
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      return imagesArray[randomIndex];
    };

    // Set a random image after 3 seconds
    const timeoutId = setTimeout(() => {
      const randomImage = getRandomImage();
      setRandomImage(randomImage);
      setShowMicrophone(true); // Show the microphone after setting the random image
    }, 3000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <View>
      {/* Display the random image and text */}
      {randomImage && (
        <View>
          <Image source={randomImage} style={{ width: 100, height: 100 }} />
          <Text>Place the correct image</Text>
        </View>
      )}

      {/* Display the microphone after 3 seconds */}
      {showMicrophone && (
        <View>
          {/* Your microphone component goes here */}
          <Text>Microphone Icon or Component</Text>
        </View>
      )}
    </View>
  );
}
