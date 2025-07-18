import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const mockContributions = [
  { id: '1', name: 'Aunt Lisa', amount: 100 },
  { id: '2', name: 'You', amount: 50 },
];

export default function ContributionScreen() {
  const [amount, setAmount] = useState('');

  const addContribution = () => {
    alert(`Contributed $${amount}`);
    setAmount('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Family Trust Contributions</Text>
      <TextInput
        placeholder="Enter amount (USD)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Contribute" onPress={addContribution} />
      <FlatList
        data={mockContributions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ paddingVertical: 6 }}>{item.name} - ${item.amount}</Text>
        )}
      />
    </View>
  );
}
