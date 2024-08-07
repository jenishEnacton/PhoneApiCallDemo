import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/core/Header';
import {COLORS} from '../../../assets/Theme/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CButton from '../../../components/core/CButton';
import {setAsyncData} from '../../../assets/Utils/asyncstorage';
import {errorToast, sucessToast} from '../../../components/core/Toast';
import {useSelector} from 'react-redux';

export default function OtpScreen({route, navigation}) {
  const {otp} = route?.params;
  const state = useSelector(state => state?.otp?.phone_number);

  const [enterOtp, setEnterOtp] = useState(null);

  const onPressVerifyOtp = async () => {
    if (enterOtp == otp) {
      if (state) {
        await setAsyncData('USERINFO', state).then(res => {
          sucessToast('Sucess', 'User Verify Sucessfully');
          setAsyncData('ISverified', (isVerify = true));
          navigation.navigate('Home');
        });
      }
    } else {
      errorToast('Error!', 'Please Enter correct OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Otp Verify'} />
      <View style={styles.inner_Container}>
        <Text style={styles.otp_title}>Verify OTP</Text>
        <OTPInputView
          style={styles.otpInput}
          pinCount={4}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setEnterOtp(code);
          }}
        />
        <CButton title={'Verify'} onPress={onPressVerifyOtp} disabled={!otp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inner_Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '70%',
    height: 200,
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: -40,
    color: COLORS.black,
    borderColor: COLORS.black,
  },
  underlineStyleBase: {
    width: 50,
    height: 45,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.black,
    fontSize: 20,
    color: COLORS.black,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
  otp_title: {
    fontSize: 20,
    color: COLORS.black,
  },
});
