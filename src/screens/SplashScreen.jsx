import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ onSplashComplete }) => {
  const [logged, setLogged] = useState(false)
  async function getData() {
    const loggedUsername = await AsyncStorage.getItem('loggedUsername');
    console.log(loggedUsername);
    if (loggedUsername) {
      setLogged(true);
    }
  }

  useEffect(() => {
    getData();
    const delay = setTimeout(() => {
      onSplashComplete();
    }, 2000);

    // Clear timeout on unmount (optional)
    return () => clearTimeout(delay);
  }, [onSplashComplete]);

  return (
    <View style={styles.splashContainer}>
      <Image
        source={require('../.././assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="black" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;