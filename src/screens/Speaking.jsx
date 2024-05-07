// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { ObjectImages } from '../../assets/images/Objects/ObjectImages';
// import { Audio } from 'expo-av';
// import { ref, onValue } from "firebase/database";
// import { getKeyById } from '../../constants/ObjectId';
// import { db } from '../../config';




// const Speaking = () => {
//   const [randomImage, setRandomImage] = useState(null);
//   const [showMicrophone, setShowMicrophone] = useState(false);
//   const [recording, setRecording] = React.useState();
//   const [recordings, setRecordings] = React.useState([]);
//   const [imageName, setImageName] = useState(null);
//   const [currentObject, setCurrentObject] = useState('abc');
//   const [wrongPlacement, setWrongPlacement] = useState(0);
//   const [correct, setCorrect] = useState(false)



//   async function startRecording() {
//     try {
//       const perm = await Audio.requestPermissionsAsync();
//       if (perm.status === "granted") {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true
//         });
//         const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//         setRecording(recording);
//       }
//     } catch (err) { }
//   }

//   async function stopRecording() {
//     setRecording(undefined);

//     await recording.stopAndUnloadAsync();
//     let allRecordings = [...recordings];
//     const { sound, status } = await recording.createNewLoadedSoundAsync();
//     allRecordings.push({
//       sound: sound,
//       duration: getDurationFormatted(status.durationMillis),
//       file: recording.getURI()
//     });

//     setRecordings(allRecordings);

//   }

//   function getDurationFormatted(milliseconds) {
//     const minutes = milliseconds / 1000 / 60;
//     const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
//     return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
//   }

//   function getRecordingLines() {
//     return recordings.map((recordingLine, index) => {
//       return (
//         <View key={index} style={styles.row}>
//           <Text style={styles.fill}>
//             Recording #{index + 1} | {recordingLine.duration}
//           </Text>
//           <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
//         </View>
//       );
//     });
//   }

//   function clearRecordings() {
//     setRecordings([])
//   }
//   useEffect(() => {
//     const getRandomImage = () => {
//       const imagesArray = ObjectImages;
//       const randomIndex = Math.floor(Math.random() * imagesArray.length);
//       return imagesArray[randomIndex];
//     };

//     const randomImage = getRandomImage();
//     setRandomImage(randomImage.source);
//     setImageName(randomImage.key)

//     const startCountRef = ref(db, 'rfid/');
//     onValue(startCountRef, (snapshot) => {
//       const data = snapshot.val();
//       const placedObject = getKeyById(data.cardUID);
//       setCurrentObject(placedObject);
//       // console.log(imageName);

//       if (placedObject === randomImage.key) {
//         // console.log("correct placement");
//         setCorrect(true);
//       } else {
//         // console.log("incorrect placement");
//         setWrongPlacement((prevCount) => prevCount + 1);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (correct) {
//       setShowMicrophone(true);
//       console.log("done");
//     }
//   }, [correct]);
//   return (
//     <View className="bg-gray-300 flex-1 justify-center items-center">
//       {randomImage && (
//         <>
//           <View className="items-center justify-center">
//             <Image source={randomImage} style={styles.image} />
//           </View>
//           <Text style={styles.placementCounter}>Wrong: {wrongPlacement - 1}</Text>

//           {correct ? <Text className="text-2xl font-bold">Speak</Text> : <Text className="text-2xl font-bold">Place the correct object</Text>}
//         </>
//       )}
//       {showMicrophone && (
//         <View style={styles.microphoneContainer}>
//           <View style={styles.container}>
//             <TouchableOpacity onPress={recording ? stopRecording : startRecording} >
//               <Text className="text-3xl">{recording ? '🛑' : '🎤'}</Text>
//             </TouchableOpacity>
//             {recordings.length > 0 && (
//               <Button title="Clear Recordings" onPress={clearRecordings} />
//             )}
//             {getRecordingLines()}
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   microphoneContainer: {
//     marginTop: 20,
//   },
// });

// export default Speaking;





import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ObjectImages } from '../../assets/images/Objects/ObjectImages';
import { Audio } from 'expo-av';
import { ref, onValue } from "firebase/database";
import { getKeyById } from '../../constants/ObjectId';
import { db } from '../../config';




const Speaking = () => {
  const [randomImage, setRandomImage] = useState(null);
  const [showMicrophone, setShowMicrophone] = useState(false);
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [imageName, setImageName] = useState(null);
  const [currentObject, setCurrentObject] = useState('abc');
  const [wrongPlacement, setWrongPlacement] = useState(0);
  const [correct, setCorrect] = useState(false)
  const [gameEnded, setGameEnded] = useState(false);




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
    setRandomImage(randomImage.source);
    setImageName(randomImage.key)

    const startCountRef = ref(db, 'rfid/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const placedObject = getKeyById(data.cardUID);
      setCurrentObject(placedObject);
      // console.log(imageName);

      if (placedObject === randomImage.key) {
        // console.log("correct placement");
        setCorrect(true);
      } else {
        // console.log("incorrect placement");
        setWrongPlacement((prevCount) => prevCount + 1);
      }
    });
  }, []);

  useEffect(() => {
    if (correct) {
      setShowMicrophone(true);
      console.log("done");
    }
  }, [correct]);


  if (gameEnded) {
    return (
      <View  className="bg-gray-300 flex h-full items-center justify-center">
        {/* <Text style={styles.placementCounter}>Correct: {correctPlacement}</Text> */}
        <Text style={styles.placementCounter}>Attempts for picture: {wrongPlacement}</Text>
        {/* <Text style={styles.placementCounter}>Difficulty: {difficulty}</Text>
        <Text style={styles.placementCounter}>Score: {score}</Text> */}

      </View>
    );
  }


  return (
    <View className="bg-gray-300 flex-1 justify-center items-center">
      {randomImage && (
        <>
          <View className="items-center justify-center">
            <Image source={randomImage} style={styles.image} />
          </View>
          <Text style={styles.placementCounter}>Wrong: {wrongPlacement - 1}</Text>

          {correct ? <Text className="text-2xl font-bold">Speak</Text> : <Text className="text-2xl font-bold">Place the correct object</Text>}
        </>
      )}
      {showMicrophone && (
        <View style={styles.microphoneContainer}>
          <View style={styles.container}>
            <TouchableOpacity onPress={recording ? stopRecording : startRecording} >
              <Text className="text-3xl">{recording ? '🛑' : '🎤'}</Text>
            </TouchableOpacity>
            {recordings.length > 0 && (
              <Button title="Clear Recordings" onPress={clearRecordings} />
            )}
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
  placementCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
});

export default Speaking;
