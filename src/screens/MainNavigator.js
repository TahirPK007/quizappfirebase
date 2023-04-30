import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Createquiz from './Createquiz';
import Addquestion from './Addquestion';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Createquiz"
        component={Createquiz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addquestion"
        component={Addquestion}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
