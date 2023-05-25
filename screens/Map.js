import { View, Text, Linking } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const position = { latitude: 33.238918, longitude: -8.520687 };

const Map = (props) => {
  const redirectToGoogleMaps = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(googleMapsUrl);
  };

  if (props.pharmacies.length === 0) {
    return <Text>No pharmacies found.</Text>;
  } else {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {props.pharmacies.map((element, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: element.latitude,
              longitude: element.longitude,
            }}
            onPress={() =>
              redirectToGoogleMaps(element.latitude, element.longitude)
            }
          >
            <Callout>
              <Text>{element.adresse}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
};

export default Map;