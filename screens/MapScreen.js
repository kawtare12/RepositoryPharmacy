import React from 'react';
import { View ,Text} from 'react-native';
import Map from './Map';
import MainScreen from './MainScreen';


function MapScreen({ route}) {
  const { pharmacies, gardeType } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Map pharmacies={pharmacies} gardeType={gardeType} />
    </View>
  );
}

export default MapScreen;