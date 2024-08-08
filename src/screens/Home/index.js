import {StyleSheet, Text, View} from 'react-native';
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

export default function Home({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
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
    // clearAsyncData('USERINFO');
    navigation.navigate('Login');
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <View style={styles.inner_container}>
        <Text style={styles.logintitle}>Logged in User</Text>
        {/* <Text style={styles.usernumber}>{!!userInfo ? userInfo : null}</Text> */}
        <CButton
          title={'Log Out'}
          extrasty={styles.button}
          onPress={() => setIsVisible(true)}
        />
        <LogoutModal
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          onPressLogout={onPressLog}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
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
