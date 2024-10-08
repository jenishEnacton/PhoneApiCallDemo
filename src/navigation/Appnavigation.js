import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/index';
import OtpScreen from '../screens/Auth/OtpScreen';
import Home from '../screens/Home';
import SplashScreen from '../screens/SplashScreen';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ForgotPassOtp from '../screens/Auth/ForgotPassword/ForgotPassOtp';
import ChangePassword from '../screens/Auth/ChangePass]word';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Icons from '../assets/icons';
import StoreDetails from '../screens/StoreDetails';
import StoreCatDetails from '../screens/StoreCatDetails';
import CouponCatDetails from '../screens/CouponCatDetails';
import AllDeals from '../screens/AllDeals';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function reset(...args) {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
}

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
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPassOtp" component={ForgotPassOtp} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="StoreDetails" component={StoreDetails} />
        <Stack.Screen name="StoreCatDetails" component={StoreCatDetails} />
        <Stack.Screen name="CouponCatDetails" component={CouponCatDetails} />
        <Stack.Screen name="AllDeals" component={AllDeals} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icons.Entypo
              name="home"
              size={25}
              style={{
                color: !focused ? '#201E43' : '#0D7C66',
              }}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icons.Ionicons
              name="person"
              size={25}
              style={{
                color: !focused ? '#201E43' : '#0D7C66',
              }}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
