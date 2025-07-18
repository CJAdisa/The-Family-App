import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default function SettingsScreen() {
  const handleDelete = () => {
    Alert.alert("Account Deletion", "This would trigger the deletion workflow.");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Settings</Text>
      <Button title="Notification Preferences" onPress={() => alert('Coming soon')} />
      <Button title="Delete My Account" onPress={handleDelete} color="red" />
    </View>
  );
}
