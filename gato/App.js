import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import { Audio } from 'expo-av';

const xImg = require('./assets/x.png');
const oImg = require('./assets/o.png');
const clickSound = require('./assets/clic.mp3');

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [sound, setSound] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(clickSound);
    setSound(sound);
    await sound.playAsync();
  };

  const handlePress = (index) => {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? 'X' : 'O';
    setBoard(newBoard);
    setXTurn(!xTurn);
    playSound();

    const winner = checkWinner(newBoard);
    if (winner) {
      const winnerName = winner === 'X' ? playerX : playerO;
      Alert.alert('¡Tenemos un ganador!', `${winnerName} ganó esta ronda 🎉`);
      const newScores = { ...scores };
      newScores[winner]++;
      setScores(newScores);
      resetBoard();
    } else if (!newBoard.includes(null)) {
      Alert.alert('Empate', 'La ronda terminó en empate 😮');
      resetBoard();
    }
  };

  const checkWinner = (b) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];
    for (const [a, b1, c] of winPatterns) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  const renderBox = (index) => (
    <TouchableOpacity key={index} style={styles.box} onPress={() => handlePress(index)}>
      {board[index] === 'X' && <Image source={xImg} style={styles.icon} />}
      {board[index] === 'O' && <Image source={oImg} style={styles.icon} />}
    </TouchableOpacity>
  );

  const handleStart = () => {
    if (playerX.trim() === '' || playerO.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el nombre de ambos jugadores');
      return;
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.title}>🧑‍🤝‍🧑 Nombres de los jugadores</Text>
          <TextInput
            placeholder="Jugador X"
            value={playerX}
            onChangeText={setPlayerX}
            style={styles.input}
          />
          <TextInput
            placeholder="Jugador O"
            value={playerO}
            onChangeText={setPlayerO}
            style={styles.input}
          />
          <Button title="Iniciar juego" onPress={handleStart} />
        </View>
      </Modal>

      <Text style={styles.title}>Tres en Raya 🎮</Text>
      <Text style={styles.score}>
        {playerX || 'X'}: {scores.X} victoria(s)
      </Text>
      <Text style={styles.score}>
        {playerO || 'O'}: {scores.O} victoria(s)
      </Text>

      <View style={styles.board}>
        {board.map((_, index) => renderBox(index))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
        <Text style={styles.resetText}>Reiniciar ronda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    marginBottom: 5,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  resetButton: {
    backgroundColor: '#4b0082',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});
