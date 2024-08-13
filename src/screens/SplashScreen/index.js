import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppImages} from '../../assets/images';
import {COLORS} from '../../assets/Theme/colors';
import {getAsyncData} from '../../assets/Utils/asyncstorage';
import i18n from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    loadLanguage();
    setTimeout(() => {
      getIsVerified();
    }, 2000);
  }, []);

  const loadLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('appLanguage');
    if (storedLanguage) {
      i18n.locale = storedLanguage;
    } else {
      i18n.locale = 'en';
    }
  };

  const getIsVerified = async () => {
    let isVerified = await getAsyncData('ISverified');
    let isToken = await getAsyncData('USER_AUTH');
    if (isVerified === true || isToken) {
      navigation.replace('TabNavigation');
    } else {
      navigation.replace('Login');
    }
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
