import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MapboxGL from './MapboxGL';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera
          zoomLevel={16}
          followUserMode={'normal'}
          followUserLocation
        />
      </MapboxGL.MapView>
      <StatusBar style="default" />
    </View>
  );
}