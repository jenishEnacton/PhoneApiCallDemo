import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/core/Header';
import {COLORS} from '../../../assets/Theme/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CButton from '../../../components/core/CButton';
import {setAsyncData} from '../../../assets/Utils/asyncstorage';
import {errorToast, sucessToast} from '../../../components/core/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {request_user_email_otp} from '../../../Redux/Actions/userAuthActions';

export default function OtpScreen({route, navigation}) {
  const {otp, mobile, email} = route?.params;
  console.log(email);

  const dispatch = useDispatch();
  const state = useSelector(state => state?.otp?.phone_number);

  const [enterOtp, setEnterOtp] = useState(null);
  const [newOtp, setNewOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isResendDisabled) {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setTimer(10);

    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    let newOtp = Math.floor(Math.random() * (max - min + 1)) + min;
    setNewOtp(newOtp);
    console.log('Resent OTP', newOtp);
    // dispatch(request_user_email_otp(mobile, newOtp));
  };

  const onPressVerifyOtp = async () => {
    if (enterOtp == otp || newOtp) {
      // if (state) {
      // await setAsyncData('USERINFO', state).then(res => {
      sucessToast('Sucess', 'User Verify Sucessfully');
      setAsyncData('ISverified', (isVerify = true));
      navigation.navigate('Home');
      // });
      // }
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
        {isResendDisabled && (
          <Text
            style={{fontSize: 15, color: COLORS.black}}>{`${timer} s`}</Text>
        )}
        <TouchableOpacity onPress={handleResendOtp} disabled={isResendDisabled}>
          <Text>{'Resend OTP'}</Text>
        </TouchableOpacity>
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
