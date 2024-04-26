import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleRegister = async () => {
    const newErrors = {};
    if (!fullName) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!username) {
      newErrors.username = 'Please enter your username';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // const response = await fetch(`${process.env.API_HOST}/user/register`, {
        const response = await fetch('http://192.168.1.35:8500/user/register', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            username,
            password,
          }),
        });
        const data = await response.json();
        if(data.message === "User already registered"){
          console.log("User already registered")
          alert("Username is already taken! Please try another username")
        } else {
          console.log('User registered successfully:', data);
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    }
  };

return (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Full Name"
      value={fullName}
      onChangeText={(text) => setFullName(text)}
    />
    {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      onChangeText={(text) => setUsername(text)}
    />
    {errors.username && <Text style={styles.error}>{errors.username}</Text>}
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    {errors.password && <Text style={styles.error}>{errors.password}</Text>}
    <TextInput
      style={styles.input}
      placeholder="Confirm Password"
      secureTextEntry
      value={confirmPassword}
      onChangeText={(text) => setConfirmPassword(text)}
    />
    {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>Sign Up</Text>
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
