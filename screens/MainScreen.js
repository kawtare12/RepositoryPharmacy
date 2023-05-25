import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Card } from 'react-native-elements';
import Map from './Map';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import MapScreen from './MapScreen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';


export default function MainScreen({ route,navigation }) {
  const [bgColor, setBgColor] = useState(Colors.white);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [gardeType, setGardeType] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  const randomImages = [
    'https://www.maroc.ma/sites/default/files/styles/thumbnail_detail_mobile/public/image_actualite/min_sante_11.05.jpg?itok=lXExFe_v',
    'https://www.monconseillerimmo.com/wp-content/uploads/pharmacie-1078x516.jpg.webp',
    'https://cdn.lemarocquejadore.com/wp-content/uploads/2020/03/PHARMACIE.MAROC_-1536x930.jpg',
    'https://1.bp.blogspot.com/-AOQVBctYzfE/YRjn3iy59sI/AAAAAAAAL18/3uxDw6_6e10CxtoqhQ2h2FKDq9yea7-3gCLcBGAsYHQ/w640-h360/pharmacie%2BMaroc%2BAnnuaire%2Bdes%2Bpharmacies%2Bau%2BMaroc.webp',
    'https://aujourdhui.ma/wp-content/uploads/2021/02/pharmacie.jpg',
    'https://static.allodocteurs.africa/btf-12-1503-thumb-660/52977fa3cd506b9140c5abe95518c448/media.jpg'
    // Add more random image URLs if needed
  ];
  const [showDialog, setShowDialog] = useState(false);
const [dialogPhoneNumbers, setDialogPhoneNumbers] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const [selectedPharmacy, setSelectedPharmacy] = useState(null);


  useEffect(() => {
    switch (route.name) {
      case 'Home':
        setBgColor(Colors.primary);
        break;
      case 'Search':
        setBgColor(Colors.green);
        break;
      case 'Add':
        setBgColor(Colors.red);
        break;
      case 'Account':
        setBgColor(Colors.purple);
        break;
      case 'Like':
        setBgColor(Colors.yellow);
        break;
      default:
        setBgColor(Colors.white);
    }
  }, []);

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
  
  const handleDetailsClick = (pharmacy) => {
  setSelectedPharmacy(pharmacy);
  setModalVisible(true);

};


  const handleMenuPress = () => {
    navigation.goBack();
  };
  const handleMapButtonPress = () => {
    navigation.navigate('MapScreen', { pharmacies, gardeType });
  };

const phoneNumber = "0623456789";

const generatePhoneNumbers = () => {
  const phoneNumber1 = '05' + Math.floor(Math.random() * 10**8).toString().padStart(8, '0');
  const phoneNumber2 = '06' + Math.floor(Math.random() * 10**8).toString().padStart(8, '0');


  return (
    <View style={styles.phoneNumbersContainer}>
      
      {phoneNumber1.startsWith('05') ? (
        <Ionicons name="call" size={20} color="green" /> // Utilisez l'icône de téléphone fixe ici
      ) :     
      (
        <Ionicons name="call" size={20} color="green" /> // Utilisez l'icône existante pour les autres numéros
      )}

      <Text style={styles.phoneNumber}>{phoneNumber1}</Text>


      <Ionicons name="call" size={20} color="green" />
      <Text style={styles.phoneNumber}>{phoneNumber2}</Text>
    </View>
  );
};


  return (
    <View style={[Styles.container, { backgroundColor: bgColor }]}>
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
      />
      <View style={styles.titleContainer}>
  <Text style={styles.title}>Localisez vos pharmacies </Text>
</View>

      <View style={styles.contentContainer}>
      <ScrollView>
        <View style={styles.formContainer}>
  <Text style={styles.message}>Ville:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={selectedCity}
      onValueChange={handleCityChange}
      itemStyle={styles.pickerItem}
    >
      <Picker.Item label="Sélectionnez une ville" value="" color="#fff" />
      {cities.map((city) => (
        <Picker.Item key={city._id} label={city.name} value={city._id} />
      ))}
    </Picker>
  </View>
</View>
<View style={styles.formContainer}>
  <Text style={styles.message}>Zone:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={selectedZone}
      onValueChange={handleZoneChange}
      itemStyle={styles.pickerItem}
      enabled={!!selectedCity}
    >
      <Picker.Item label="Sélectionnez une zone" value="" color="#fff" style={styles.boldText} />
      {zones.map((zone) => (
        <Picker.Item key={zone._id} label={zone.name} value={zone._id} />
      ))}
    </Picker>
  </View>
</View>
<View style={styles.formContainer}>
  <Text style={styles.message}>Garde:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={styles.picker}
      selectedValue={gardeType}
      onValueChange={handleGardeTypeChange}
      itemStyle={styles.pickerItem}
      enabled={!!selectedZone}
    >
      <Picker.Item label="Sélectionnez le type de garde" value="" color="#fff" />
      <Picker.Item label="Garde de jour" value="jour" />
      <Picker.Item label="Garde de nuit" value="nuit" />
    </Picker>
  </View>
</View>

        <View style={styles.pharmaciesContainer}>
        {pharmacies.map((pharmacy) => {
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  return (
    <Card key={pharmacy._id} containerStyle={styles.card}>
     <Text style={styles.modalText}>{pharmacy.name}</Text>
      <Image source={{ uri: randomImages[randomIndex] }} style={styles.image} />

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          const phoneNumbers = generatePhoneNumbers();
          setDialogPhoneNumbers(phoneNumbers);
          setShowDialog(true);
          handleDetailsClick(pharmacy);
        }}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </Card>
  );
})}

      </View>







        <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={handleMapButtonPress}>
    <Text style={styles.buttonText}>Afficher la carte</Text>
  </TouchableOpacity>
  <Text style={styles.Text}>Trouvez facilement votre chemin vers notre pharmacie grace a notre carte interactive. Obtenez des indications precises et decouvrez les services que nous proposons. N'hésitez pas à nous rendre visite pour tous vos besoins en matière de santé et de bien-être.</Text>
</View>

  <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
  <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Informations</Text>
          {selectedPharmacy && (
            <View>
              <Text style={styles.modalText}>  <Ionicons name="medical" size={20} color="green" /> Nom de la pharmacie :</Text>
              <Text style={styles.modal}>{selectedPharmacy.name}</Text>

               <View style={styles.addressContainer}>
     {/* Icône d'adresse */}
    <Text style={[styles.modalText, styles.addressText]}><Ionicons name="location" size={20} color="red" />Adresse :</Text>
    <Text style={styles.address}>{selectedPharmacy.address}</Text>
  </View>
<Text style={styles.modalText}>
              <Ionicons name="call" size={20} color="blue" /> Numéro de téléphone :
            </Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              
            </View>
          )}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
</Modal>

        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    color: '#66CDAA',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
phoneNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  phoneNumber: {
    marginLeft: 5,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
    modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
   fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   modal: {
   fontSize: 15,
    
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2F4F4F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  pickerItem: {
  color: '#fff', // ou toute autre couleur de texte que vous souhaitez utiliser
},
titleContainer: {
  alignItems: 'center',
  marginTop: 20,
},
title: {
  fontSize: 40,
  fontWeight: 'bold',
  color: 'white',
  textShadowColor: 'gray',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 2,
},

  message: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginBottom: 20,
    width: '80%',
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
    width: '100%',
     minWidth: 270,
  },
  picker: {
    height: 40,
    color: '#333',
    fontSize: 16,
    width: '100%',
  },
  pharmaciesContainer: {
    width: '80%',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 2,
      minWidth: 270,

    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  mapContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
});