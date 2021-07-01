import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import MapboxGL from './MapboxGL';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      {!!(location) ? 
      (<MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera
          zoomLevel={16}
          followUserMode={'normal'}
          followUserLocation
        />
      </MapboxGL.MapView>) : null}
      <StatusBar style="default" />
    </View>
  );
}