import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Log = () => {
  const [selectedTab, setSelectedTab] = useState('Basic Etiquette');
  const [username, setUsername] = useState('');
  const basicEtiquetteData = [];
  const memoryTestData = [];
  const speechTrainingData = [];

  const getUser = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('User is:',value);
        setUsername(value);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  getUser("loggedUsername");

  const adjustToIST = (dateTimeString) => {
    const utcDateTime = new Date(dateTimeString);
    const istDateTime = new Date(utcDateTime.getTime() + (5.5 * 60 * 60 * 1000)); // Add IST offset (+5:30 hours)
    const date = istDateTime.toISOString().split('T')[0];
    const time = istDateTime.toLocaleTimeString('en-US', { hour12: false });
    return `${date} ${time}`;
  };
  const formatDateTimeToIST = (dateTimeString) => {
    try {
      if (dateTimeString.endsWith('Z')) {
        // Manually adjust to IST for UTC date-time strings
        return adjustToIST(dateTimeString);
      }
  
      // For non-UTC date-time strings, perform regular IST conversion
      const dateTime = new Date(dateTimeString);
      if (isNaN(dateTime.getTime())) {
        console.error('Invalid date format:', dateTimeString);
        return null;
      }
  
      const istDateTime = new Date(dateTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      if (isNaN(istDateTime.getTime())) {
        console.error('Error converting to IST:', dateTimeString);
        return null;
      }
  
      const date = istDateTime.toISOString().split('T')[0];
      const time = istDateTime.toLocaleTimeString('en-US', { hour12: false });
      return `${date} ${time}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const fetchBasicEtiquetteData = async () => {
    try {
      const apiUrl = 'http://192.168.43.53:8500/games/getbasicetiquette/admin';
      const response = await axios.get(apiUrl);
      const formattedData = response.data.map(item => ({
        date: formatDateTimeToIST(item.date),
        timeToComplete: parseInt(item.timeToComplete),
        numberOfWrong: parseInt(item.noOfWrong),
        totalAttempts: parseInt(item.totalNoOfAttempt),
        score: parseInt(item.score),
      }));
      basicEtiquetteData.push(...formattedData);
      // console.log(basicEtiquetteData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchBasicEtiquetteData()


  const fetchMemoryTestData = async () => {
    try {
      const apiUrl = 'http://192.168.43.53:8500/games/getmemorytest/admin';
      const response = await axios.get(apiUrl);
      const formattedData = response.data.map(item => ({
        date: formatDateTimeToIST(item.date),
        difficulty: parseInt(item.difficulty),
        timeToComplete: parseInt(item.timeToComplete),
        numberOfWrong: parseInt(item.noOfWrong),
        totalAttempts: parseInt(item.totalNoOfAttempt),
        score: parseInt(item.score),
      }));
      memoryTestData.push(...formattedData);
      // console.log(memoryTestData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchMemoryTestData()

  const fetchSpeechTrainingData = async () => {
    try {
      const apiUrl = 'http://192.168.43.53:8500/games/getspeechtraining/admin';
      const response = await axios.get(apiUrl);
      const formattedData = response.data.map(item => ({
        date: formatDateTimeToIST(item.date),
        attemptsForPic: parseInt(item.attemptForPicture),
        attemptsForSpeech: parseInt(item.attemptForSpeech),
        score: parseInt(item.score),
      }));
      speechTrainingData.push(...formattedData);
      // console.log(speechTrainingData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchSpeechTrainingData()


  const renderTable = () => {
    switch (selectedTab) {
      case 'Basic Etiquette':
        return (
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Time to Complete</Text>
              <Text style={styles.columnHeader}>Number of Wrong</Text>
              <Text style={styles.columnHeader}>Total Attempts</Text>
              <Text style={styles.columnHeader}>Score</Text>
            </View>
            <FlatList
              data={basicEtiquetteData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.timeToComplete}</Text>
                  <Text style={styles.cell}>{item.numberOfWrong}</Text>
                  <Text style={styles.cell}>{item.totalAttempts}</Text>
                  <Text style={styles.cell}>{item.score}</Text>
                </View>
              )}
            />
          </View>
        );
      case 'Memory Test':
        return (
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Difficulty</Text>
              <Text style={styles.columnHeader}>Time to Complete</Text>
              <Text style={styles.columnHeader}>Number of Wrong</Text>
              <Text style={styles.columnHeader}>Total Attempts</Text>
              <Text style={styles.columnHeader}>Score</Text>
            </View>
            <FlatList
              data={memoryTestData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.difficulty}</Text>
                  <Text style={styles.cell}>{item.timeToComplete}</Text>
                  <Text style={styles.cell}>{item.numberOfWrong}</Text>
                  <Text style={styles.cell}>{item.totalAttempts}</Text>
                  <Text style={styles.cell}>{item.score}</Text>
                </View>
              )}
            />
          </View>
        );
      case 'Speech Training':
        return (
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Attempts for Pic</Text>
              <Text style={styles.columnHeader}>Attempts for Speech</Text>
              <Text style={styles.columnHeader}>Score</Text>
            </View>
            <FlatList
              data={speechTrainingData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.attemptsForPic}</Text>
                  <Text style={styles.cell}>{item.attemptsForSpeech}</Text>
                  <Text style={styles.cell}>{item.score}</Text>
                </View>
              )}
            />
          </View>
        );
      default:
        return null;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, selectedTab === 'Basic Etiquette' && styles.selectedTab]} onPress={() => setSelectedTab('Basic Etiquette')}>
          <Text>Basic Etiquette</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, selectedTab === 'Memory Test' && styles.selectedTab]} onPress={() => setSelectedTab('Memory Test')}>
          <Text>Memory Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, selectedTab === 'Speech Training' && styles.selectedTab]} onPress={() => setSelectedTab('Speech Training')}>
          <Text>Speech Training</Text>
        </TouchableOpacity>
      </View>
      {renderTable()}
      <TouchableOpacity style={styles.classifyButton}>
        <Text style={styles.classifyButtonText}>Classify Me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    backgroundColor: '#ddd',
  },
  selectedTab: {
    backgroundColor: 'blue',
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
  columnHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  classifyButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  classifyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },  
});

export default Log;







// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const Log = () => {
//   const [selectedTab, setSelectedTab] = useState('Basic Etiquette');
//   const [username, setUsername] = useState('');
//   const [basicEtiquetteData, setBasicEtiquetteData] = useState([]);
//   const [memoryTestData, setMemoryTestData] = useState([]);
//   const [speechTrainingData, setSpeechTrainingData] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('beforeRemove', () => {
//       // Clear arrays when user navigates away from the screen
//       setBasicEtiquetteData([]);
//       setMemoryTestData([]);
//       setSpeechTrainingData([]);
//     });

//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => {
//     const getUser = async (key) => {
//       try {
//         const value = await AsyncStorage.getItem(key);
//         if (value !== null) {
//           console.log('User is:', value);
//           setUsername(value);
//         } else {
//           console.log('No data found.');
//         }
//       } catch (error) {
//         console.error('Error retrieving data:', error);
//       }
//     };
//     getUser("loggedUsername");

//     // Fetch data functions and renderTable function
//   }, []);

//   // Styles and rendering logic remain the same

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Tab buttons, FlatList, and other UI components */}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // Styles remain the same
// });

// export default Log;
