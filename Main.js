import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Main() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [gardeType, setGardeType] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Fetch cities
    const fetchCities = async () => {
      try {
        const response = await fetch('https://backend-orpin-ten.vercel.app/api/cities');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch zones for selected city
    const fetchZones = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(`https://backend-orpin-ten.vercel.app/api/zones/city/${selectedCity}`);
          const data = await response.json();
          setZones(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchZones();
  }, [selectedCity]);

  useEffect(() => {
    // Fetch pharmacies for selected zone and garde type
    const fetchPharmacies = async () => {
      if (selectedZone && gardeType) {
        try {
          const response = await fetch(`https://backend-orpin-ten.vercel.app/api/pharmacies/${gardeType}/${selectedZone}/${selectedCity}`);
          const data = await response.json();
          setPharmacies(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPharmacies();
  }, [selectedZone, gardeType]);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedZone(null);
    setGardeType(null);
    setZones([]);
    setPharmacies([]);
  };

  const handleZoneChange = (value) => {
    setSelectedZone(value);
  };

  const handleGardeTypeChange = (value) => {
    setGardeType(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Ville:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedCity}
            onValueChange={handleCityChange}
          >
            <Picker.Item label="Sélectionnez une ville" value="" />
            {cities.map((city) => (
              <Picker.Item key={city._id} label={city.name} value={city._id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Zone:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedZone}
            onValueChange={handleZoneChange}
            enabled={!!selectedCity}
          >
            <Picker.Item label="Sélectionnez une zone" value="" />
            {zones.map((zone) => (
              <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Garde:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={gardeType}
            onValueChange={handleGardeTypeChange}
            enabled={!!selectedZone}
          >
            <Picker.Item label="Sélectionnez le type de garde" value="" />
            <Picker.Item label="Garde de jour" value="jour" />
            <Picker.Item label="Garde de nuit" value="nuit" />
          </Picker>
        </View>
      </View>
      <View style={styles.pharmaciesContainer}>
        {pharmacies.map((pharmacy) => (
          <View key={pharmacy._id} style={styles.pharmacyCard}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                const message = `Nom: ${pharmacy.name}\nAdresse: ${pharmacy.address}\nType de garde: ${pharmacy.garde}`;

                // Replace with your custom alert component or library
                alert(message);
              }}
            >
              <Text style={styles.detailsButtonText}>Afficher les détails</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center vertically
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    color: '#333', // Text color
    fontSize: 16, // Text font size
  },
  pharmaciesContainer: {
    flex: 1,
  },
  pharmacyCard: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pharmacyAddress: {
    fontSize: 14,
    marginBottom: 5,
  },
  detailsButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  detailsButtonText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Main;