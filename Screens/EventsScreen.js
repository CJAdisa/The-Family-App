import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (snap) =>
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'events'), {
      ...newEvent,
      creator: auth.currentUser.uid,
      createdAt: Date.now()
    });
    setModalVisible(false);
    setNewEvent({ title: '', date: '' });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'events', id));
  };

  const marked = events.reduce((acc, e) => {
    acc[e.date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Calendar markedDates={marked} />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
            <Text>{item.date}: {item.title}</Text>
            {item.creator === auth.currentUser.uid && (
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            )}
          </View>
        )}
      />
      <Button title="Create Event" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000aa', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
            <TextInput placeholder="Title" value={newEvent.title} onChangeText={(t) => setNewEvent((s) => ({ ...s, title: t }))} />
            <TextInput placeholder="YYYY-MM-DD" value={newEvent.date} onChangeText={(d) => setNewEvent((s) => ({ ...s, date: d }))} />
            <Button title="Add" onPress={handleAdd} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
