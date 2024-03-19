import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      console.log(accessToken);
      if (!accessToken) {
        throw new Error('Internal server error try again');
      }
      const response = await axios.get('http://192.168.1.53:8500/user/current', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data.username);
      AsyncStorage.setItem('loggedUsername', response.data.username);
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      console.log('Success');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.53:8500/user/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        console.log(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        if(fetchCurrentUser() && accessToken != null){
        navigation.navigate('Worksheet');
        }
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;