// components/HomeScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph, FAB, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Mi Agenda" subtitle="Ejemplo con Material Design" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card} onPress={() => navigation.navigate('Details')}>
          <Card.Content>
            <Title>Organiza tu día</Title>
            <Paragraph>Una pequeña tarjeta con información y llamada a la acción.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Details')}>Ver</Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Recordatorio</Title>
            <Paragraph>Configura alertas y notificaciones para tus tareas.</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Crear nuevo')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  card: { marginBottom: 12 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
  },
});
