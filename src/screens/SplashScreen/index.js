import {Image, StyleSheet, Text, View} from 'react-native';
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
    await getAsyncData('ISverified').then(res => {
      if (res === true) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });
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
