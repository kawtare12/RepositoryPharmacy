import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Card } from 'react-native-elements';

const Pharmacy = () => {
  const handleDetailsButton = (pharmacy) => {
    const message = `Nom: ${pharmacy.name}
Adresse: ${pharmacy.address}
Latitude: ${pharmacy.latitude}
Longitude: ${pharmacy.longitude}
Type de garde: ${pharmacy.garde}`;

    // Afficher les détails de la pharmacie
    alert(message);
  };

  return (
    <View>
      <Card containerStyle={{ marginBottom: 10 }}>
        <Card.Title>Pharmacy 1</Card.Title>
        <Card.Divider />
        <Card.FeaturedSubtitle>Address 1</Card.FeaturedSubtitle>
        <Image
          source={require('./assets/snack-icon.png')} // Remplacez le chemin d'accès par l'image réelle de la pharmacie
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        <Button
          title="Afficher les détails"
          onPress={() => handleDetailsButton({
            name: 'Pharmacy 1',
            address: 'Address 1',
            latitude: 12.3456,
            longitude: 78.9012,
            garde: 'Type 1'
          })}
        />
      </Card>

      <Card containerStyle={{ marginBottom: 10 }}>
        <Card.Title>Pharmacy 2</Card.Title>
        <Card.Divider />
        <Card.FeaturedSubtitle>Address 2</Card.FeaturedSubtitle>
        <Image
          source={require('./assets/snack-icon.png')} // Remplacez le chemin d'accès par l'image réelle de la pharmacie
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        <Button
          title="Afficher les détails"
          onPress={() => handleDetailsButton({
            name: 'Pharmacy 2',
            address: 'Address 2',
            latitude: 34.5678,
            longitude: 90.1234,
            garde: 'Type 2'
          })}
        />
      </Card>

      <Card containerStyle={{ marginBottom: 10 }}>
        <Card.Title>Pharmacy 3</Card.Title>
        <Card.Divider />
        <Card.FeaturedSubtitle>Address 3</Card.FeaturedSubtitle>
        <Image
          source={require('./assets/snack-icon.png')} // Remplacez le chemin d'accès par l'image réelle de la pharmacie
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        <Button
          title="Afficher les détails"
          onPress={() => handleDetailsButton({
            name: 'Pharmacy 3',
            address: 'Address 3',
            latitude: 56.7890,
            longitude: 12.3456,
            garde: 'Type 3'
          })}
        />
      </Card>
    </View>
  );
};

export default Pharmacy;
