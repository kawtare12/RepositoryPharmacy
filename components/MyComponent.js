import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const MyComponent = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch('https://api.example.com/cities');
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZones = async (city) => {
    try {
      const response = await fetch(`https://api.example.com/zones?city=${city}`);
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGuards = async (zone) => {
    try {
      const response = await fetch(`https://api.example.com/guards?zone=${zone}`);
      const data = await response.json();
      setGuards(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    fetchZones(city);
  };

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    fetchGuards(zone);
  };

  return (
    <View>
      <Text>Choisissez une ville :</Text>
      <Picker selectedValue={selectedCity} onValueChange={handleCityChange}>
        <Picker.Item label="Sélectionnez une ville" value="" />
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city.name} value={city.id} />
        ))}
      </Picker>

      {selectedCity !== '' && (
        <>
          <Text>Choisissez une zone :</Text>
          <Picker selectedValue={selectedZone} onValueChange={handleZoneChange}>
            <Picker.Item label="Sélectionnez une zone" value="" />
            {zones.map((zone, index) => (
              <Picker.Item key={index} label={zone.name} value={zone.id} />
            ))}
          </Picker>
        </>
      )}

      {selectedZone !== '' && (
        <>
          <Text>Choisissez une garde :</Text>
          <Picker
            selectedValue={selectedGuard}
            onValueChange={(guard) => setSelectedGuard(guard)}
          >
            <Picker.Item label="Sélectionnez une garde" value="" />
            {guards.map((guard, index) => (
              <Picker.Item key={index} label={guard.name} value={guard.id} />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
};

export default MyComponent;
