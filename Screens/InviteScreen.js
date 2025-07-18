import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function InviteScreen() {
  const [inviteCode, setInviteCode] = useState('');

  const createInvite = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Generate Invite Code" onPress={createInvite} />
      {inviteCode ? <Text style={{ marginTop: 20 }}>Share this code: {inviteCode}</Text> : null}
    </View>
  );
}
