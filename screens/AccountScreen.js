import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ route, navigation }) {
  const viewRef = React.useRef(null);
  const [bgColor, setBgColor] = useState();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  useEffect(() => {
    switch (route.name) {
      case 'Home': {
        setBgColor(Colors.primary);
        break;
      }
      case 'Search': {
        setBgColor(Colors.green);
        break;
      }
      case 'Add': {
        setBgColor(Colors.red);
        break;
      }
      case 'Account': {
        setBgColor(Colors.purple);
        break;
      }
      case 'Like': {
        setBgColor(Colors.yellow);
        break;
      }
      default:
        setBgColor(Colors.white);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    return () => unsubscribe();
  }, [navigation]);
  const handleSendMessage = () => {
    // Logique de traitement du message ici

    // Réinitialiser les champs de texte et afficher le message de succès
    setName('');
    setCity('');
    setMessage('');

    setTimeout(() => {
    setShowSuccessMessage(false);
  }, 3000);
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

      <Animatable.View ref={viewRef} easing={'ease-in-out'} style={Styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={require('../profil.PNG')} style={styles.profileImage} />
          </View>
          <Text style={styles.profileText}>Profil</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.contactTitle}>Contactez nous</Text>
          <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#fff"value={name}
          onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Your City" placeholderTextColor="#fff" value={city}
          onChangeText={setCity} />
          <TextInput style={styles.input} placeholder="Message" multiline={true} numberOfLines={4} placeholderTextColor="#fff" value={message}
          onChangeText={setMessage} />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-twitter" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-instagram" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  overflow: 'hidden', // Ajoutez cette ligne pour masquer le contenu débordant
},
  successMessage: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  profileText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});
