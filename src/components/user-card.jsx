import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default UserCard = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user.picture.data.url }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>{user.location.name}</Text>
          <Text style={styles.subContent}>
            Hometown: <Text style={styles.italic}>{user.hometown.name}</Text>
          </Text>
          <Text style={styles.subContent}>
            Gender: <Text style={styles.italic}>{user.gender}</Text>
          </Text>
          <Text style={styles.subContent}>
            Email: <Text style={styles.italic}>{user.email}</Text>
          </Text>
          <Text style={styles.subContent}>
            Birthday: <Text style={styles.italic}>{user.birthday}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
    height: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  location: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'grey',
  },
  subContent: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
  italic: {
    fontStyle: 'italic',
  },
});
