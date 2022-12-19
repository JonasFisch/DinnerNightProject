import {Button} from 'react-native';
import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';

export const LogoutButton = () => {
  const userContext = useContext(UserContext);
  const logout = () => {
    userContext.logout();
  };
  return <Button title="Logout" onPress={logout} />;
};
