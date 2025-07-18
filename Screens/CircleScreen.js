import React from 'react';
import { View, Text, FlatList } from 'react-native';

const circles = [
  { id: '1', name: 'Maternal Side' },
  { id: '2', name: 'NY Cousins' },
  { id: '3', name: 'Legacy Keepers' },
];

export default function CircleScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>My Family Circles</Text>
      <FlatList
        data={circles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{ padding: 10 }}>{item.name}</Text>}
      />
    </View>
  );
}
