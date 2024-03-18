import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Linking } from 'react-native';

export default function Worksheet({navigation}) {
  const handleExploreGamesPress = () => {
    // Add logic for Explore Games press
    navigation.navigate('Games');
  };

  const handleSocialVideosPress = () => {
    const youtubeSearchUrl = 'https://www.youtube.com/results?search_query=cartoon+videos';
    Linking.openURL(youtubeSearchUrl);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  const handleLogPress = () => {
    navigation.navigate('Log');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/worksheet-background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Explore Games Card */}
        <TouchableOpacity style={styles.card} onPress={handleExploreGamesPress}>
          <Image
            source={require('../../assets/images/worksheet-games.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Explore Games</Text>
        </TouchableOpacity>

        {/* Social Videos Card */}
        <TouchableOpacity style={styles.card} onPress={handleSocialVideosPress}>
          <Image
            source={require('../../assets/images/worksheet-video.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Social Videos</Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity style={[styles.button]} onPress={handleProfilePress}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>

        {/* Log Button */}
        <TouchableOpacity style={[styles.button]} onPress={handleLogPress}>
          <Text style={styles.buttonText}>Log</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(169, 169, 169, 0.7)',
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
  button: {
    backgroundColor: 'rgba(169, 169, 169, 0.7)',
    borderRadius: 30,
    padding: 15,
    margin: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
