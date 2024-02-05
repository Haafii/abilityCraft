import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Games = ({ navigation }) => {
    const handleBasicEtiquettePress = () => {
        console.log('Basic Etiquette card pressed');
        // Add your logic specific to Basic Etiquette card here
    };

    const handleMemoryTestPress = () => {
        console.log('Memory Test card pressed');
        navigation.navigate('MemoryTest');
        // Add your logic specific to Memory Test card here
    };

    const handleSpeakingPress = () => {
        console.log('Speaking card pressed');
        navigation.navigate('Speaking');
        // Add your logic specific to Speaking card here
    };

    const renderCard = (title, imagePath, onPress) => (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={imagePath} style={styles.cardImage} />
            <Text style={styles.cardText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/games-back.jpg')}
            style={styles.container}
        >
            <View className="flex-1 items-center justify-center">
                {renderCard('Basic Etiquette', require('../../assets/images/basic-ett.jpg'), handleBasicEtiquettePress)}
                {renderCard('Memory Test', require('../../assets/images/memory.jpg'), handleMemoryTestPress)}
                {renderCard('Speaking', require('../../assets/images/speeeech.jpg'), handleSpeakingPress)}
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
});

export default Games;
