import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({ name: '', avatar: '' });

  useEffect(() => {
    const ref = doc(db, 'profiles', auth.currentUser.uid);
    getDoc(ref).then((snap) => {
      if (snap.exists()) setProfile(snap.data());
    });
  }, []);

  const saveProfile = async () => {
    await setDoc(doc(db, 'profiles', auth.currentUser.uid), profile, { merge: true });
    alert('Profile saved');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={profile.name} onChangeText={(t) => setProfile((s) => ({ ...s, name: t }))} style={styles.input} />
      <Text style={styles.label}>Avatar URL</Text>
      <TextInput value={profile.avatar} onChangeText={(t) => setProfile((s) => ({ ...s, avatar: t }))} style={styles.input} />
      <Button title="Save Profile" onPress={saveProfile} />
      <Button title="Sign Out" onPress={() => auth.signOut()} color="tomato" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, borderRadius: 6 },
});
