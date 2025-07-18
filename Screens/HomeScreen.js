import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage, auth } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'feed'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const addPhoto = async () => {
    const p = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (p.canceled || !p.assets || !p.assets.length) return;
    const asset = p.assets[0];
    const resp = await fetch(asset.uri);
    const blob = await resp.blob();
    const path = `feed/${Date.now()}.jpg`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, 'feed'), { photoURL: url, createdAt: Date.now(), uid: auth.currentUser.uid });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Post Photo" onPress={addPhoto} />
      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.photoURL }} style={{ width: '100%', height: 250, marginVertical: 10 }} />
        )}
      />
    </View>
  );
}
