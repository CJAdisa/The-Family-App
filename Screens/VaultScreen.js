import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { db, storage, auth } from '../firebaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as WebBrowser from 'expo-web-browser';

export default function VaultScreen() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'vault'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap =>
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  const uploadDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    });
    if (res.type === 'cancel' || !res.assets?.[0]) return;

    const file = res.assets[0];
    const resp = await fetch(file.uri);
    const blob = await resp.blob();
    const storageRef = ref(storage, `vault/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'vault'), {
      userId: auth.currentUser.uid,
      name: file.name,
      uri: url,
      createdAt: Date.now()
    });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Upload Document" onPress={uploadDocument} />
      <FlatList
        data={docs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.uri)}>
            <Text style={{ marginVertical: 10 }}>📄 {item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
