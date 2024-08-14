import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import Header from '../../../components/core/Header';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CButton from '../../../components/core/CButton';
import {COLORS} from '../../../assets/Theme/colors';
import {request_forgot_pass_email} from '../../../Redux/Actions/userAuthActions';
import {useSelector} from 'react-redux';
import {Loader} from '../../../components/core/Loader';

export default function ForgotPassOtp({route, navigation}) {
  const loading = useSelector(state => state?.params.loading);
  const {email, otp} = route?.params;

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
    dispatch(request_forgot_pass_email(email, newOtp));
  };

  const onPressVerifyOtp = async () => {
    if (enterOtp == otp || newOtp) {
      navigation.navigate('ChangePassword', {email: email, otp: enterOtp});
    } else {
      errorToast('Error!', 'Please Enter correct OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Verify OTP'} isBack />
      <View style={styles.inner_container}>
        <Text style={styles.otp_title}>Enter OTP sent to your email</Text>
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
        <CButton
          title={'Verify'}
          onPress={onPressVerifyOtp}
          disabled={!otp}
          borderRadius={20}
        />
        {isResendDisabled && (
          <Text
            style={{fontSize: 15, color: COLORS.black}}>{`${timer} s`}</Text>
        )}
        <TouchableOpacity onPress={handleResendOtp} disabled={isResendDisabled}>
          <Text>{'Resend OTP'}</Text>
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
    </View>
  );
}
