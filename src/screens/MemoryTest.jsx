import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';

const MemoryTest = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [images, setImages] = useState([]);
  const [timer, setTimer] = useState(30);
  const [countingDown, setCountingDown] = useState(false);
  const [start, setStart] = useState(false);
  const [selectedImagesHistory, setSelectedImagesHistory] = useState([]);
  const [showButtons, setShowButtons] = useState(true);

  const startGame = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    const numberOfImages = difficultyLevel === 'easy' ? 4 : difficultyLevel === 'medium' ? 8 : 12;

    const selectedImages = [];
    
    while (selectedImages.length < numberOfImages) {
      const randomImage = ObjectImages[Math.floor(Math.random() * ObjectImages.length)];
      if (!selectedImages.includes(randomImage)) {
        selectedImages.push(randomImage);
      }
    }
    setSelectedImagesHistory((prevHistory) => [...prevHistory, selectedImages]);

    setImages(selectedImages);
    console.log(selectedImages);
    setTimer(30);
    setCountingDown(true);
  };

  useEffect(() => {
    // Clear the selected images history array when a new random selection takes place
    setSelectedImagesHistory([]);
  }, [images]);

  useEffect(() => {
    let interval;

    if (countingDown && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (countingDown && timer === 0) {
      setCountingDown(false);
      setImages([]);
      setShowButtons(false)
    }

    return () => clearInterval(interval);
  }, [countingDown, timer]);

  const handleStartClick = () => {
    setCountingDown(true);
    setTimer(1000);
    setImages([]);
    setStart(true);
  };

  const handleEndClick = () => {
    setCountingDown(false);
    setStart(false);
    console.log(1000 - timer);
    setShowButtons(true);
  };

  return (
    <View className="flex-1 bg-gray-200 w-full h-full items-center justify-center">
      {showButtons && <View style={styles.buttonContainer} className="flex-row w-1/2 items-center justify-between">
        <Button title="Easy" onPress={() => startGame('easy')}/>
        <Button title="Medium" onPress={() => startGame('medium')} />
        <Button title="Hard" onPress={() => startGame('hard')} />
      </View>}
      {images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} className="object-cover"/>
          ))}
        </View>
      )}
      {countingDown && <Text style={styles.timer}>{timer}</Text>}
      {!countingDown && timer === 0 && (
        <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
          <Text>Start</Text>
        </TouchableOpacity>
      )}
      {start && (
        <TouchableOpacity style={styles.startButton} onPress={handleEndClick}>
          <Text>End</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 15,
  },
  timer: {
    fontSize: 18,
    marginTop: 20,
  },
  startButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default MemoryTest;
