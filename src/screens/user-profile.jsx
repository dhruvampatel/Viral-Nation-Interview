import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Profile, LoginManager } from 'react-native-fbsdk-next';
import UserCard from '../components/user-card';

export default UserProfile = () => {
  const [user, setUser] = useState(null);

  const retrieveProfile = () => {
    Profile.getCurrentProfile()
      .then(profile => {
        if (profile) {
          console.log('Profile:', profile);
          setUser(profile);
        }
      })
      .catch(err => {
        console.log('Error while retrieving profile:', err);
      });
  };

  const login = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ',
            result.grantedPermissions.toString()
          );
          retrieveProfile();
        }
      },
      error => {
        console.log('Login failed with error: ', error);
      }
    );
  };

  const logout = () => {
    LoginManager.logOut();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Button
        title={user ? 'Logout' : 'Login with Facebook'}
        onPress={() => (user ? logout() : login())}
      />
      <UserCard user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: 20,
  },
});
