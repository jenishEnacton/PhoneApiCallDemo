import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/index';
import OtpScreen from '../screens/Auth/OtpScreen';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Signup from '../screens/Auth/Signup';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.log('navigation failed');
  }
}

export const Appnavigation = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
