import React, { useEffect, useState } from 'react';
import { TextInput, TouchableHighlight, Alert } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AccessToken } from 'react-native-fbsdk-next';
import { useSelector, useDispatch } from 'react-redux';
//Actions
import { fetchGroupFeed } from '../redux/actions/group-actions';
//Helper
import Queries from '../helper/Queries';

export default CreateGroupPost = ({ group }) => {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [postMessage, setPostMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (group.length === 0) return;

    const _groupList = group.map(g => ({ label: g.name, value: g.id }));
    setGroupList(_groupList);
  }, [group]);

  useEffect(() => {
    if (!selectedGroup) return;

    getGroupFeed();
  }, [selectedGroup]);

  const handlePost = async () => {
    setIsLoading(true);
    if (selectedGroup === null || postMessage.trim() === '') {
      Alert.alert('Oops', 'Please select a group and write something to post');
      setIsLoading(false);
      return;
    }

    const result = await AccessToken.getCurrentAccessToken();
    Queries.postToGroup(
      selectedGroup,
      postMessage,
      result?.accessToken,
      (error, result) => {
        if (error) {
          console.log('Error posting message: ' + error.response);
          setIsLoading(false);
        } else {
          console.log('Success posting message: ', result);
          setIsLoading(false);
          setPostMessage('');
          Alert.alert('Success', 'Post successfully created');
          //Re-fetch the group feed for latest post
          getGroupFeed();
        }
      }
    );
  };

  const getGroupFeed = async () => {
    const result = await AccessToken.getCurrentAccessToken();
    Queries.getGroupFeed(
      selectedGroup,
      result?.accessToken,
      (error, result) => {
        if (error) {
          console.log('Error fetching group feed: ' + error.response);
          setIsLoading(false);
        } else {
          console.log('Success fetching group feed: ', result);
          dispatch(fetchGroupFeed(result.data));
        }
      }
    );
  };

  if (group.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>CREATE GROUP POST</Text>
        <DropDownPicker
          open={showList}
          value={selectedGroup}
          items={groupList}
          setOpen={() => setShowList(true)}
          setValue={setSelectedGroup}
          setItems={setGroupList}
          onClose={() => setShowList(false)}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownText}
          containerStyle={styles.dropdownContainer}
          placeholder='Select Group'
          placeholderStyle={{
            color: 'grey',
          }}
        />

        <TextInput
          value={postMessage}
          onChangeText={setPostMessage}
          placeholder='Write a post...'
          style={styles.input}
          placeholderTextColor='grey'
        />

        <TouchableHighlight
          style={styles.button}
          onPress={handlePost}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Post'}
          </Text>
        </TouchableHighlight>
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
  dropdown: {
    width: '100%',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  dropdownContainer: {
    width: '100%',
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 12,
    color: 'black',
  },
  button: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'lightgrey',
    width: '100%',
    marginTop: 20,
    height: 45,
    borderRadius: 5,
  },
});
