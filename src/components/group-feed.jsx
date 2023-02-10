import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FeedItem = ({ item }) => {
  return (
    <View style={styles.feedItem}>
      <Text style={styles.message}>{item.message || item.story}</Text>
      <Text style={styles.time}>{item.updated_time}</Text>
    </View>
  );
};

export default GroupFeed = ({ feed }) => {
  if (feed.length === 0) return null;

  useEffect(() => {
    if (feed.length === 0) return;

    console.log('Group feed:', feed);
  }, [feed]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>GROUP FEED</Text>
        {feed.map((item, index) => {
          return <FeedItem key={item.id} item={item} />;
        })}
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
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  feedItem: {
    marginTop: 10,
    width: '100%',
    backgroundColor: 'lightgrey',
    padding: 5,
  },
  message: {
    fontSize: 14,
    color: 'black',
  },
  time: {
    fontSize: 10,
    color: 'grey',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
