import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  const [estado, setEstado] = useState("inicio");

  const frutas = ["Manzana", "Uva", "Pera"];

  const manejarClick = () => {
    setContador(contador + 1);

    if (contador < 2) {
      setEstado("cargando");
    } else if (contador < 4) {
      setEstado("éxito");
    } else {
      setEstado("finalizado");
    }
  };

  let mensaje;
  switch (estado) {
    case "inicio":
      mensaje = "Pulsa el botón para empezar.";
      break;
    case "cargando":
      mensaje = "Cargando datos...";
      break;
    case "éxito":
      mensaje = "¡Datos cargados con éxito!";
      break;
    case "finalizado":
      mensaje = "Has completado la interacción.";
      break;
    default:
      mensaje = "Esperando acción...";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estructuras de Control con Expo</Text>
      <Text style={styles.text}>{mensaje}</Text>
      <Text style={styles.text}>Veces pulsadas: {contador}</Text>

      <Button title="Pulsar" onPress={manejarClick} />

      {/* Renderizado condicional */}
      {estado === "éxito" && (
        <View style={styles.lista}>
          {frutas.map((fruta, index) => (
            <Text key={index} style={styles.item}>{fruta}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  lista: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});
