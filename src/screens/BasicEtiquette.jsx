import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const BasicEtiquette = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [showPlaceCards, setShowPlaceCards] = useState(false);
    const [count, setCount] = useState(0);

    const videos = [
        require('../../assets/videos/1.mp4'),
        require('../../assets/videos/2.mp4'),
        require('../../assets/videos/3.mp4'),
    ];

    const onEnd = () => {
        setShowVideo(false);
        setShowPlaceCards(true);
    };

    useEffect(() => {
        let interval;
        if (!showVideo && showPlaceCards) {
            interval = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [showVideo, showPlaceCards]);

    return (
        <View style={styles.container} className="bg-gray-300">
            {showVideo && (
                <Video
                    source={videos[Math.floor(Math.random() * videos.length)]}
                    shouldPlay
                    isLooping={false}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            onEnd();
                        }
                    }}
                    style={styles.video}
                />
            )}

            {showPlaceCards && (
                <View style={styles.placeCardsContainer}>
                    <Text style={styles.placeCardsText}>Place Cards</Text>
                    <Text style={styles.countText}>{`${count}`}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    placeCardsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    placeCardsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    countText: {
        fontSize: 50,
    },
});

export default BasicEtiquette;




