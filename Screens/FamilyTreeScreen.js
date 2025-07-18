import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const mockFamily = [
  { id: '1', name: 'Grandma Alice', role: 'Matriarch' },
  { id: '2', name: 'Uncle Joe', role: 'Son' },
  { id: '3', name: 'You', role: 'Grandchild' },
];

export default function FamilyTreeScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Family Tree</Text>
      <FlatList
        data={mockFamily}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 6 }}>
            <Text>{item.name} - {item.role}</Text>
          </View>
        )}
      />
      <Button title="Add Family Member" onPress={() => alert('Feature coming soon')} />
    </View>
  );
}
