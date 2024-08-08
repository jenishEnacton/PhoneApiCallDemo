import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppImages} from '../../assets/images';
import {COLORS} from '../../assets/Theme/colors';
import {getAsyncData} from '../../assets/Utils/asyncstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      getIsVerified();
    }, 2000);
  }, []);

  const getIsVerified = async () => {
    await getAsyncData('ISverified').then(res => {
      if (res === true) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });
    // await AsyncStorage.getItem('USER_AUTH').then(res => {
    //   if (res) {
    //     navigation.replace('Home');
    //   } else {
    //     navigation.replace('Login');
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <Image source={AppImages.splash} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
