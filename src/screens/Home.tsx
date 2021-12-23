import React, { useState, useCallback } from 'react';

import { FriendList } from '../components/FriendList';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

interface Data {
  id: string;
  name: string;
  likes: number;

}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.15.10:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((friend: Data) => {
      return {
        id: friend.id,
        name: friend.name,
        likes: friend.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`
      }
    });
    
    setFriends(formattedData);
  }

  const handleFollow = useCallback(() => {
    console.log(`follow user`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        placeholder="Nome do cliente"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />

      <FriendList
        data={friends}
        follow={handleFollow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10
  }
});