// working
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Log = () => {
  const [selectedTab, setSelectedTab] = useState('Basic Etiquette');
  const [username, setUsername] = useState('');
  const [basicEtiquetteScore, setBasicEtiquetteScore] = useState(0);
  const [memoryTestScore, setMemoryTestScore] = useState(0);
  const [speechTrainingScore, setSpeechTrainingScore] = useState(0);
  const [clickClassifyMe, setClassifyMe] = useState(false);
  const [predictedClass, setPredictedClass] = useState(null);
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

  useEffect(() => {
    getUser("loggedUsername");
  },);

  useEffect(() => {
    // Calculate latest scores when relevant data arrays change
    // calculateLatestScores();
  }, [basicEtiquetteData, memoryTestData, speechTrainingData]);
  
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
      const apiUrl = 'http://192.168.1.35:8500/games/getbasicetiquette/admin';
      // const apiUrl = `http://192.168.1.35:8500/games/getbasicetiquette/${username}`;
      // console.log(apiUrl);
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
      const apiUrl = 'http://192.168.1.35:8500/games/getmemorytest/admin';
      // const apiUrl = `http://192.168.1.35:8500/games/getmemorytest/${username}`;
      const response = await axios.get(apiUrl);
      const formattedData = response.data.map(item => ({
        date: formatDateTimeToIST(item.date),
        difficulty: item.difficulty,
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
      const apiUrl = 'http://192.168.1.35:8500/games/getspeechtraining/admin';
      // const apiUrl = `http://192.168.1.35:8500/games/getspeechtraining/${username}`;
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
  const calculateLatestScores = async () => {
    let latestBasicEtiquette;
    let latestMemoryTest;
    let latestSpeechTraining;
    
    if (basicEtiquetteData.length > 0) {
      latestBasicEtiquette = basicEtiquetteData[basicEtiquetteData.length - 1];
      setBasicEtiquetteScore(latestBasicEtiquette.score);
    }
  
    if (memoryTestData.length > 0) {
      latestMemoryTest = memoryTestData[memoryTestData.length - 1];
      setMemoryTestScore(latestMemoryTest.score);
    }
  
    if (speechTrainingData.length > 0) {
      latestSpeechTraining = speechTrainingData[speechTrainingData.length - 1];
      setSpeechTrainingScore(latestSpeechTraining.score);
    }
  
    const url = 'https://abilitycraft-model-3.onrender.com/predict'; // Update the URL here
    const inputData = {
      basic_etiquette: latestBasicEtiquette ? latestBasicEtiquette.score : 0,
      memory_test: latestMemoryTest ? latestMemoryTest.score : 0,
      speech_test: latestSpeechTraining ? latestSpeechTraining.score : 0
    };
  
    console.log('Input data:', inputData);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Predicted class:', responseData.predicted_class);
      setPredictedClass(responseData.predicted_class);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  };
    

  const handleClassifyMe = () => {
    console.log('Classifying...');
    calculateLatestScores();
    setClassifyMe(true);
  };


  if (clickClassifyMe && predictedClass) {
    return (
      <View className="bg-gray-300 flex h-full items-center justify-center">
        <Text style={styles.placementCounter}>Class: {predictedClass}</Text>
      </View>
    );
  }
  
  if (clickClassifyMe) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  


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
        <Text style={styles.classifyButtonText} onPress={handleClassifyMe}>Classify Me</Text>
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
  placementCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333', // You can change the color as needed
  },
  containerLoading: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
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