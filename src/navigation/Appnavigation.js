import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/index';
import OtpScreen from '../screens/Auth/OtpScreen';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export const Appnavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};
