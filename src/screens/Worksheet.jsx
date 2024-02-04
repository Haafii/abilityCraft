import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

export default function Worksheet() {
  return (
    <ImageBackground
      source={require('../../assets/images/worksheet-background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Explore Games Card */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/worksheet-games.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Explore Games</Text>
        </View>

        {/* Social Videos Card */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/worksheet-video.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Social Videos</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
    borderRadius: 10,
    padding: 20,
    margin: 10,
    width: 300,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
