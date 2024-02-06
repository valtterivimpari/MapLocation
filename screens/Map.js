import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
    const [location, setLocation] = useState({
        latitude: 65.0000,
        longitude: 25.400,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    useEffect(() => {
        getUserPosition(); // Call getUserPosition when the component mounts
    }, []); // Empty dependency array means this effect will run only once when the component mounts

    const getUserPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed');
                return;
            }
            const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation({
                ...location,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MapView
            style={styles.map}
            region={location} // Corrected typo in "region" attribute
        />
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});
