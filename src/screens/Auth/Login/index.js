import {Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './style';
import Header from '../../../components/core/Header';
import GoogleButton, {GoogleLogin} from '../../../components/core/GoogleButton';
import {useDispatch} from 'react-redux';
import {request_user_email_otp} from '../../../Redux/Actions/userAuthActions';
import {Field, Formik} from 'formik';
import {phonenumberschema} from '../../../assets/Utils/validation';
import CustomeInput from '../../../components/core/TextInput';
import CButton from '../../../components/core/CButton';
import {Loader} from '../../../components/core/Loader';
import {sucessToast} from '../../../components/core/Toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function Login({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [generateOtp, setGenerateOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      await GoogleLogin()
        .then(res => {
          console.log('Email Res', res);
          console.log('Res', res.user.email);
          sucessToast('Sucess', 'User login Sucessfully,Please Verify OTP');
          if (res) {
            let min = Math.ceil(1000);
            let max = Math.floor(9999);
            let otp = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log('Generated Email OTP', otp);
            setGenerateOtp(otp);
            // dispatch(request_user_email_otp(res.user.email, otp, false));
          }
        })
        .catch(err => console.log(err));
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong',
      );
    }
  };

  const onPressVerifyOtp = () => {
    if (generateOtp) {
      if (generateOtp == otp) {
        sucessToast('Sucess', 'OTP Verified Sucessfully');
        setIsVerified(true);
      }
    }
  };

  const handleNumSubmt = async val => {
    setGenerateOtp(null);
    if (val) {
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('Generated OTP', otp);
      // dispatch(request_user_email_otp(val.phoneNumber, otp));
      setIsVerified(false);
      navigation.navigate('OtpScreen', {otp: otp, mobile: val.phoneNumber});
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Google Login'} />
      <View style={styles.inner_container}>
        <GoogleButton onPress={handleGoogleLogin} />
        {generateOtp && (
          <>
            <Text style={styles.otp_title}>Verify OTP</Text>
            <OTPInputView
              style={styles.otpInput}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setOtp(code);
              }}
            />
            <CButton
              title={'Verify'}
              onPress={onPressVerifyOtp}
              disabled={!otp}
            />
          </>
        )}

        {isVerified && (
          <Formik
            innerRef={formikRef}
            initialValues={{
              phoneNumber: '+91 ',
            }}
            validationSchema={phonenumberschema}
            onSubmit={(values, {resetForm}) => {
              handleNumSubmt(values);
              resetForm();
            }}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Field
                  values={values.phoneNumber}
                  component={CustomeInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <CButton
                  title={'Submit'}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        )}
      </View>
      {isLoading && <Loader />}
    </View>
  );
}
