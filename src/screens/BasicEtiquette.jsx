//almost completed
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { db } from '../../config';
import { ref, onValue } from "firebase/database";
import { ObjectImages } from '../../assets/images/BasicEtiquette/ObjectImages';
import { getKeyById } from '../../constants/BasicEtiquetteId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const videoNames = ["1.mp4", "2.mp4", "3.mp4"];

const videos = [
    require('../../assets/videos/1.mp4'),
    require('../../assets/videos/2.mp4'),
    require('../../assets/videos/3.mp4'),
];

const videoPrefixMap = {
    0: "One",
    1: "Two",
    2: "Three"
};

const placeCardArrays = videoNames.map((name, index) => {
    const prefix = videoPrefixMap[index];
    return Array.from({ length: 4 }, (_, i) => `${prefix}${i + 1}`);
});



const BasicEtiquette = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [showPlaceCards, setShowPlaceCards] = useState(false);
    const [count, setCount] = useState(0);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
    const [correctPlacement, setCorrectPlacement] = useState(0);
    const [wrongPlacement, setWrongPlacement] = useState(0);
    const [showEnd, setShowEnd] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [score, setScore] = useState(null);
    const [placedObjects, setPlacedObjects] = useState([]);
    const [username, setUsername] = useState(null);

    async function getData() {
        const loggedUsername = await AsyncStorage.getItem('loggedUsername');
        setUsername(loggedUsername)
    }

    let currentIndex = 0;
    const max_time = 90;
    const max_wrong_attempt = 20;
    const max_total_attempt = 24

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setSelectedVideoIndex(randomIndex);
    }, []);

    useEffect(() => {
        getData();
        if (showEnd && !gameEnded) {
            setScore(10 - (3.33 * ((count / max_time) + ((wrongPlacement-1) / max_wrong_attempt) + ((wrongPlacement-1) / max_total_attempt))));      
        }
    })
    const handleSubmitScore = async () => {
        console.log(count);
        console.log("Score:", score);
        setGameEnded(true);
        try {
            // const response = await axios.post(`${process.env.API_HOST}/user/login`, {
            const response = await axios.post('http://192.168.128.212:8500/games/basicetiquette', {

                username: username,
                timeToComplete: count,
                noOfWrong: wrongPlacement,
                totalNoOfAttempt: wrongPlacement + 4,
                score: score
            });
            console.log(response.data);
        } catch (error) {
            console.log('Error', error.response.data.message);
        }
    }

    useEffect(() => {
        if (selectedVideoIndex !== null) {
            const startCountRef = ref(db, 'rfid/');
            onValue(startCountRef, (snapshot) => {
                const data = snapshot.val();
                const card = getKeyById(data.cardUID);
                placedObjects.push(getKeyById(data.cardUID));
                setPlacedObjects([...placedObjects]);
                // console.log("Card:", card);
                // console.log("Current Index:", currentIndex);
                // console.log("Selected Video:", videoNames[selectedVideoIndex]);
                console.log("Place Card Array:", placeCardArrays[selectedVideoIndex]);
                if (currentIndex < placeCardArrays[selectedVideoIndex].length && placeCardArrays[selectedVideoIndex][currentIndex] == card) {
                    setCorrectPlacement((prevCount) => prevCount + 1);
                    console.log("Correct Placement");
                    currentIndex++;
                    if (currentIndex == 4) {
                        setShowEnd(true);
                    }
                } else {
                    setWrongPlacement((prevCount) => prevCount + 1);
                    console.log("Wrong Placement");
                }

            });
        }
    }, [selectedVideoIndex]);

    const onEnd = () => {
        setShowVideo(false);
        setShowPlaceCards(true);
    };

    useEffect(() => {
        let interval;
        if (!showVideo && showPlaceCards) {
            interval = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [showVideo, showPlaceCards]);

    // Conditionally render score and placement when game ends
    if (gameEnded) {
        return (
            <View style={styles.container} className="bg-gray-300">
                <Text style={styles.placementCounter}>Correct Placement: {correctPlacement}</Text>
                <Text style={styles.placementCounter}>Wrong Placement: {wrongPlacement - 1}</Text>
                <Text style={styles.placementCounter}>Score: {score}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container} className="bg-gray-300">
            <Text style={styles.placementCounter}>Correct Placement: {correctPlacement}</Text>
            <Text style={styles.placementCounter}>Wrong Placement: {wrongPlacement - 1}</Text>
            {showVideo && (
                <Video
                    source={videos[selectedVideoIndex]}
                    shouldPlay
                    isLooping={false}
                    resizeMode={ResizeMode.CONTAIN}
                    // orientation={portrait}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            onEnd();
                        }
                    }}
                    style={styles.video}
                />
            )}
            {showPlaceCards && (<>
                <View style={styles.placeCardsContainer}>
                    <Text style={styles.placeCardsText}>Place Cards</Text>
                    <Text style={styles.countText}>{`${count}`}</Text>
                </View>
                <View style={styles.containerImage}>
                    {placedObjects.slice(1).map((item, index) => (
                        // console.log("Item:", item),
                        // console.log("Index:", index),
                        <Image key={index} source={ObjectImages[item]} style={styles.image} />
                    ))}
                </View>
                {showEnd && <TouchableOpacity style={styles.startButton} onPress={handleSubmitScore}>
                    <Text>End</Text>
                </TouchableOpacity>}
            </>
            )}
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     containerImage: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//       },
//     video: {
//         width: '100%',
//         height: '100%',
//     },
//     placeCardsContainer: {
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     placeCardsText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     countText: {
//         fontSize: 50,
//     },
//     startButton: {
//         // marginTop: 10,
//         marginBottom: 40,
//         padding: 20,
//         backgroundColor: 'lightblue',
//         borderRadius: 5,
//     },
//     image: {
//         width: 100,
//         height: 100,
//         margin: 15,
//       },
// });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Set a background color for the container
    },
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
    video: {
        width: '100%',
        height: '100%',
    },
    placeCardsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    placeCardsText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    placementCounter: {
        fontSize: 18,
        marginBottom: 10,
    },
    countText: {
        fontSize: 40,
        marginBottom: 20,
    },
    startButton: {
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#007bff', // Change button color to a primary color
        borderRadius: 5,
        marginBottom: 40,
    },
    startButtonText: {
        fontSize: 18,
        color: '#ffffff', // Set text color to white for better contrast
    },
    image: {
        width: 100,
        height: 100,
        margin: 10, // Adjust margin for images
        borderRadius: 5, // Add border radius to images for a softer look
    },
});
export default BasicEtiquette;