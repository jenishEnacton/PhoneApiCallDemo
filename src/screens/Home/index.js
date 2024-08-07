import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/core/Header';
import CButton from '../../components/core/CButton';
import {setAsyncData} from '../../assets/Utils/asyncstorage';

export default function Home({navigation}) {
  const onPressLogOut = () => {
    setAsyncData('ISverified', (isVerify = false));
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Header title={'Home'} />
      <View style={styles.inner_container}>
        <CButton
          title={'Log Out'}
          extrasty={styles.button}
          onPress={onPressLogOut}
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
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  },
});
