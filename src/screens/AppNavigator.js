import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import AuthNavigator from './AuthNavigator';
import HomeScreen from './HomeScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [currentuser, setcurrentuser] = useState(null);
  const [isloading, setisloading] = useState(true);

  const onAuthStateChanged = async user => {
    await setcurrentuser(user);
    setisloading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isloading) {
    return null;
  }
  return (
    <NavigationContainer>
      {currentuser ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
