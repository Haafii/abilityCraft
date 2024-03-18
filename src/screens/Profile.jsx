import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
export default function Profile() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://via.placeholder.com/150' }}
            />
            <Text style={styles.username}>John Doe</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Username:</Text>
                <Text style={styles.infoText}>johndoe@example.com</Text>
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={styles.infoText}>New York, USA</Text>
            </View> */}
            {/* Add more info sections as needed */}
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
});