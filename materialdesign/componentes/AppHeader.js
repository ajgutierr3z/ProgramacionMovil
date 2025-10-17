// AppHeader.js
import React from 'react';
import { Appbar } from 'react-native-paper';

/**
 * Componente: AppHeader
 * Descripción:
 *   Barra superior estilo Material Design con título,
 *   íconos y color primario definidos en el tema.
 */
const AppHeader = ({ title, onBack, onMore }) => {
  return (
    <Appbar.Header elevated>
      {/* Botón de retroceso si se pasa la prop onBack */}
      {onBack && <Appbar.BackAction onPress={onBack} />}

      {/* Título central */}
      <Appbar.Content title={title} titleStyle={{ fontWeight: 'bold' }} />

      {/* Botón de opciones adicionales si se pasa la prop onMore */}
      {onMore && <Appbar.Action icon="dots-vertical" onPress={onMore} />}
    </Appbar.Header>
  );
};

export default AppHeader;
