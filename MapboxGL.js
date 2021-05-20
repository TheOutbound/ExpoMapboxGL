// MapboxGL.js
import * as React from 'react';
import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import Config from "react-native-config";

let MapboxGL;

if (Constants.appOwnership === 'expo') {
  MapView = props => (
    <View
      style={[
        {
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      <Text>🗺 (Mapbox not available)</Text>
    </View>
  );
} else {
  const Mapbox = require('@react-native-mapbox-gl/maps').default;
  Mapbox.setAccessToken(Constants?.manifest?.extra?.MAPBOX_API_KEY || Config?.MAPBOX_API_KEY);
  MapboxGL = Mapbox
}

export default MapboxGL;