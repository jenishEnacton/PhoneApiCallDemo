import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppImages} from '../../../assets/images';
import {COLORS} from '../../../assets/Theme/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import config from '../../../react-native-config';

GoogleSignin.configure({
  webClientId: config.WEB_CLIENT_ID,
  androidClientId: config.ANDROID_CLIENT_ID,
  iosClientId: config.IOS_CLIENT_ID,
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

export const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export default function GoogleButton(props) {
  const {onPress, image, title} = props;
  return (
    <TouchableOpacity style={styles.googlebtn} onPress={onPress}>
      <Image source={image} style={styles.googleicon} />
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googlebtn: {
    borderRadius: 10,
    padding: 10,
    width: '70%',
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    elevation: 10,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 5,
    fontSize: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  googleicon: {
    width: 30,
    height: 30,
  },
});
