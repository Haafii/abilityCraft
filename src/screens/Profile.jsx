import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile({ navigation }) {
    const [username, setUsername] = useState(null);
    const [FullName, setFullName] = useState(null);
    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log('Data removed successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error removing data:', error);
        }
    };
    const handleLogout = () => {
        removeData('loggedUsername');
        removeData('loggedFullName');
    };

    async function getData() {
        const loggedUsername = await AsyncStorage.getItem('loggedUsername');
        const loggedFullName = await AsyncStorage.getItem('loggedFullName');
        setUsername(loggedUsername);
        setFullName(loggedFullName);

    }
    useEffect(() => {
        getData();
    })

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://img.freepik.com/free-photo/cat-with-bell-its-neck-collar-that-says-cat-it_1340-32743.jpg?size=626&ext=jpg' }}
            />
            <Text style={styles.username}>{FullName}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Username:</Text>
                <Text style={styles.infoText}>{username}</Text>
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Full Name:</Text>
                <Text style={styles.infoText}>{FullName}</Text>
            </View> */}
            {/* Add more info sections as needed */}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoText: {
        fontSize: 16,
    },
    buttonContainer: {
        backgroundColor: 'rgba(169, 169, 169, 0.7)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
