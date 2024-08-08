import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppImages} from '../../assets/images';
import {COLORS} from '../../assets/Theme/colors';
import {getAsyncData} from '../../assets/Utils/asyncstorage';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      getIsVerified();
    }, 2000);
  }, []);

  const getIsVerified = async () => {
    let isVerified = await getAsyncData('ISverified');
    let isToken = await getAsyncData('USER_AUTH');
    if (isVerified === true || isToken) {
      navigation.navigate('Home');
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
