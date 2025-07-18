import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function ChatScreen() {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'chat'), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snap) =>
      setMsgs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, []);

  const send = async () => {
    if (!msg) return;
    await addDoc(collection(db, 'chat'), {
      text: msg,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });
    setMsg('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={msgs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 4 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.uid}:</Text> {item.text}
          </Text>
        )}
      />
      <TextInput
        value={msg}
        onChangeText={setMsg}
        placeholder="Type your message..."
        style={{ borderWidth: 1, padding: 8, marginTop: 8 }}
      />
      <Button title="Send" onPress={send} />
    </View>
  );
}
