//working code 
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';
import { db } from '../../config';
import { ref, onValue } from "firebase/database";
import { getKeyById } from '../../constants/ObjectId';
import { Images } from "../../assets/images/Objects/Images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MemoryTest = () => {
  const [selectedImageKeys, setSelectedImageKeys] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [images, setImages] = useState([]);
  const [timer, setTimer] = useState(30);
  const [countingDown, setCountingDown] = useState(false);
  const [start, setStart] = useState(false);
  const [selectedImagesHistory, setSelectedImagesHistory] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [currentObject, setCurrentObject] = useState(null);
  const [placedObjects, setPlacedObjects] = useState([]);
  const [correctPlacement, setCorrectPlacement] = useState(0);
  const [wrongPlacement, setWrongPlacement] = useState(0);
  const [username, setUsername] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const a = useRef(0);
  const max_time = 300;
  const max_wrong = 25;
  const max_total_attempt = 37;
  const [score, setScore] = useState(0);


  const startGame = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    const numberOfImages = difficultyLevel === 'easy' ? 4 : difficultyLevel === 'medium' ? 8 : 12;

    const selectedImages = [];
    const keys = [];

    while (selectedImages.length < numberOfImages) {
      const randomIndex = Math.floor(Math.random() * ObjectImages.length);
      const randomImage = ObjectImages[randomIndex];
      const randomImageKey = randomImage.key;
      if (!keys.includes(randomImageKey)) {
        selectedImages.push(randomImage.source);
        keys.push(randomImageKey);
      }
    }
    console.log("images", keys);
    setSelectedImagesHistory((prevHistory) => [...prevHistory, keys]);
    const updatedKeys = [keys]
    setSelectedImageKeys(...updatedKeys);
    setImages(selectedImages);
    setTimer(15);
    setCountingDown(true);
  };

  async function getData() {
    const loggedUsername = await AsyncStorage.getItem('loggedUsername');
    setUsername(loggedUsername)
  }
  useEffect(() => {
    // console.log("selectedImageKeys", selectedImageKeys);
    a.current = selectedImageKeys
    // console.log(a)
  }, [selectedImageKeys]);

  useEffect(() => {
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
      setShowButtons(false);
    }

    return () => clearInterval(interval);
  }, [countingDown, timer]);

  useEffect(() => {
    getData();
  })

  useEffect(() => {
    const startCountRef = ref(db, 'rfid/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("data from firebase :",data.cardUID);
      setCurrentObject(getKeyById(data.cardUID));

      placedObjects.push(getKeyById(data.cardUID));
      setPlacedObjects([...placedObjects]);

      // Call the checkPlacement function when placing a new object
      checkPlacement(getKeyById(data.cardUID));
      console.log("reading from firebase and passed to getKey:", getKeyById(data.cardUID));
    });
  }, []);


  // Function to check placement and update counters
  const checkPlacement = (objectId) => {
    // console.log("yyy",selectedImageKeys);
    // console.log("yyy",a.current);
    if (a.current.flat().includes(objectId)) {
      setCorrectPlacement((prevCount) => prevCount + 1);
    } else {
      setWrongPlacement((prevCount) => prevCount + 1);
    }
  };


  const handleStartClick = () => {
    setCountingDown(true);
    setTimer(1000);
    setImages([]);
    setStart(true);
  };
  const calculateScore = async () => {
    let newScore = 0;
    if (difficulty === 'easy') {
      newScore = 7 - 3 * ((1000 - timer) / max_time + (wrongPlacement - 1) / max_wrong + (wrongPlacement - 1) / max_total_attempt) + 1;
    } else if (difficulty === 'medium') {
      newScore = 7 - 3 * ((1000 - timer) / max_time + (wrongPlacement - 1) / max_wrong + (wrongPlacement - 1) / max_total_attempt) + 3;
    } else if (difficulty === 'hard') {
      newScore = 4 - 3 * ((1000 - timer) / max_time + (wrongPlacement - 1) / max_wrong + (wrongPlacement - 1) / max_total_attempt) + 6;
    }
    console.log('score', newScore);
    console.log('wrong', wrongPlacement - 1);
    console.log('time', 1000 - timer);
    console.log('difficulty', difficulty);
    console.log('username', username);
    console.log('totalNumber of attemp', wrongPlacement + correctPlacement - 1);
    setScore(newScore);
    try {
      // const response = await axios.post(`${process.env.API_HOST}/user/login`, {
      const response = await axios.post('http://192.168.128.212:8500/games/memorytest', {
        username: username,
        timeToComplete: 1000 - timer,
        noOfWrong: wrongPlacement - 1,
        totalNoOfAttempt: wrongPlacement + correctPlacement - 1,
        score: newScore,
        difficulty: difficulty,
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error', error);
      if (error.response && error.response.data && error.response.data.message) {
        console.log('Error message:', error.response.data.message);
      }
    }
    setGameEnded(true)
  }



  const handleEndClick = () => {
    setCountingDown(false);
    setStart(false);
    // console.log(1000 - timer);
    setShowButtons(true);
    setPlacedObjects([]);
    // setCorrectPlacement(0);
    // setWrongPlacement(0);
    calculateScore();
  };

  // console.log(correctPlacement)

  if (gameEnded) {
    return (
      <View  className="bg-gray-300 flex h-full items-center justify-center">
        <Text style={styles.placementCounter}>Correct: {correctPlacement}</Text>
        <Text style={styles.placementCounter}>Wrong: {wrongPlacement}</Text>
        <Text style={styles.placementCounter}>Difficulty: {difficulty}</Text>
        <Text style={styles.placementCounter}>Score: {score}</Text>

      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-200 w-full h-full items-center justify-center">
      {/* Render placement counters */}
      <Text style={styles.placementCounter}>Correct Placement: {correctPlacement}</Text>
      <Text style={styles.placementCounter}>Wrong Placement: {wrongPlacement - 1}</Text>

      {showButtons && <View style={styles.buttonContainer} className="flex-row w-1/2 items-center justify-between">
        <Button title="Easy" onPress={() => startGame('easy')} />
        <Button title="Medium" onPress={() => startGame('medium')} />
        <Button title="Hard" onPress={() => startGame('hard')} />
      </View>}
      {images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} className="object-cover" />
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
        <><TouchableOpacity style={styles.startButton} onPress={handleEndClick}>
          <Text>End</Text>
        </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.container}>
            {currentObject &&
              placedObjects.slice(1).map((item, index) => (
                <View key={index} style={styles.row}>
                  {placedObjects.slice(1 + index * 3, 1 + index * 3 + 3).map((subItem, subIndex) => (
                    <Image key={subIndex} source={Images[subItem]} style={styles.image} />
                  ))}
                </View>
              ))}
          </ScrollView>

        </>

      )}
    </View>
  );
};

export default MemoryTest;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerGameEnded: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set a background color for the container
},
  images: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  image: {
    width: 100,
    height: 100,
    margin: 15,
  },
  timer: {
    fontSize: 40,
    marginTop: 20,
  },
  startButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  placementCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333', // You can change the color as needed
  },
});



