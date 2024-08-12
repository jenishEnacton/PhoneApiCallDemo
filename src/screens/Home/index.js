import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/core/Header';
import CButton from '../../components/core/CButton';
import {
  clearAsyncData,
  getAsyncData,
  setAsyncData,
} from '../../assets/Utils/asyncstorage';
import {LogoutModal} from '../../components/core/LogoutModal';
import {COLORS} from '../../assets/Theme/colors';
import Change_Language from '../../components/core/ChangeLanguage';
import i18n, {trasnlate} from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('appLanguage');
    if (storedLanguage) {
      i18n.locale = storedLanguage;
      setLanguage(storedLanguage === 'en' ? false : true);
    } else {
      i18n.locale = 'en';
    }
  };

  const selectLang = async () => {
    const newLanguage = language ? 'en' : 'hi';
    setLanguage(!language);
    i18n.locale = newLanguage ? newLanguage : 'en';
    await AsyncStorage.setItem('appLanguage', newLanguage);
  };

  // const [userInfo, setUserInfo] = useState('');

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // const getUserInfo = async () => {
  //   console.log('Get User');
  //   let data = await getAsyncData('USERINFO');
  //   setUserInfo(data);
  // };

  const onPressLog = async () => {
    await setAsyncData('ISverified', (isVerify = false));
    clearAsyncData('USER_AUTH');
    // clearAsyncData('USERINFO');
    navigation.navigate('Login');
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <View style={styles.inner_container}>
        <Change_Language value={language} onValueChange={selectLang} />
        <Text>{trasnlate('login')}</Text>
      </View>
      <CButton title={'Next'} onPress={() => navigation.navigate('Home2')} />
      <CButton
        title={trasnlate('logout')}
        extrasty={styles.button}
        onPress={() => setIsVisible(true)}
      />
      <LogoutModal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        onPressLogout={onPressLog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    marginHorizontal: 20,
  },
  button: {
    width: '50%',
  },
  usernumber: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.black,
  },
  logintitle: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 30,
  },
});
