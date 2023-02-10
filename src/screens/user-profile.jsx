import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useSelector, useDispatch } from 'react-redux';
//Components
import UserCard from '../components/user-card';
import CreateGroupPost from '../components/create-group-post';
import GroupFeed from '../components/group-feed';
//Helper
import Query from '../helper/Queries';
import Group from '../helper/Group';
//Actions
import { loginUser, logoutUser } from '../redux/actions/user-actions';
import { fetchGroups } from '../redux/actions/group-actions';

//Query parameters
const USER_PROFILE_PARAMETERS =
  'id,name,gender,hometown,location,email,birthday,picture{url}';
const GROUP_LIST_PARAMETERS = 'groups{id,name,administrator}';

export default UserProfile = () => {
  const user = useSelector(state => state.user);
  const group = useSelector(state => state.group);
  const groupFeed = useSelector(state => state.groupFeed);
  const dispatch = useDispatch();

  const handleUserInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.response);
    } else {
      // console.log('Success fetching data: ', result);
      //Store the user object into the redux store
      dispatch(loginUser(result));
    }
  };

  const handleGroupListCallback = (error, result) => {
    if (error) {
      console.log('Error fetching group list: ' + error.response);
    } else {
      const data = Group.filterGroupList(result.groups.data);
      // console.log('Success fetching group list: ', data);
      dispatch(fetchGroups(data));
    }
  };

  const fetchData = async () => {
    const result = await AccessToken.getCurrentAccessToken();
    //Request user information
    Query.requestInfo(
      USER_PROFILE_PARAMETERS,
      result?.accessToken,
      handleUserInfoCallback
    );
    //Request group list
    Query.requestInfo(
      GROUP_LIST_PARAMETERS,
      result?.accessToken,
      handleGroupListCallback
    );
  };

  const login = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          fetchData();
        }
      },
      error => {
        console.log('Login failed with error: ', error);
      }
    );
  };

  const logout = () => {
    LoginManager.logOut();
    //Remove the user object on logout
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Button
            title={user ? 'Logout' : 'Login with Facebook'}
            onPress={() => (user ? logout() : login())}
          />
          {user && <UserCard user={user} />}
          {user && <CreateGroupPost group={group} />}
          {user && <GroupFeed feed={groupFeed} />}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
});
