import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const Log = () => {
  const [selectedTab, setSelectedTab] = useState('Basic Etiquette');

  const basicEtiquetteData = [
    { date: '2024-03-15', timeToComplete: '1:30', numberOfWrong: 2, totalAttempts: 5, score: 80 },
    // Add more data as needed
  ];

  const memoryTestData = [
    { date: '2024-03-16', difficulty: 'Medium', timeToComplete: '2:00', numberOfWrong: 3, totalAttempts: 6, score: 75 },
    // Add more data as needed
  ];

  const speechTrainingData = [
    { date: '2024-03-17', attemptsForPic: 4, attemptsForSpeech: 2, score: 90 },
    // Add more data as needed
  ];

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
    borderRadius: 5,
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
});

export default Log;
