import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });