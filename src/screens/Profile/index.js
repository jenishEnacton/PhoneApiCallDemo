import {Alert, Linking, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/Theme/colors';
import {trasnlate} from '../../translations';
import Header from '../../components/core/Header';
import CButton from '../../components/core/CButton';
import {LogoutModal} from '../../components/core/LogoutModal';
import {clearAsyncData, setAsyncData} from '../../assets/Utils/asyncstorage';
import {useDispatch} from 'react-redux';
import {request_log_out} from '../../Redux/Actions/userAuthActions';

export default function Profile({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const onPressLog = async () => {
    await setAsyncData('ISverified', (isVerify = false));
    // dispatch(request_log_out());
    clearAsyncData('USER_AUTH');
    navigation.navigate('Login');
    setIsVisible(false);
  };

  const email = '+91 7265079268';

  const handleLongPress = () => {
    Alert.alert(
      'Actions',
      'What would you like to do?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: async () => {
            Linking.openURL(`tel:${email}`);
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <Header title={trasnlate('profile')} isBack />

      <View style={styles.inner_container}>
        <CButton title={email} onLongPress={handleLongPress} />
        <CButton
          title={trasnlate('log_out')}
          extrasty={styles.btn_sty}
          borderRadius={15}
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
    backgroundColor: COLORS.white,
  },
  inner_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_sty: {
    width: 200,
    height: 50,
    padding: 0,
    justifyContent: 'center',
  },
});
