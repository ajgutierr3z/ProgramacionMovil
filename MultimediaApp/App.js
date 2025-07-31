import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sound.mp3') // Coloca tu archivo en /assets
    );
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 App Multimedia 🎵</Text>
      
      <Image 
        source={require('./assets/example.png')} // Usa tu imagen aquí
        style={styles.image}
      />
      
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>Reproducir Sonido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 20
  },
  button: {
    backgroundColor: '#4b0082',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
