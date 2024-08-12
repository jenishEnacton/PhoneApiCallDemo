import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './style';
import Header from '../../../components/core/Header';
import GoogleButton, {GoogleLogin} from '../../../components/core/GoogleButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  request_social_login,
  request_user_email_otp,
  request_user_login,
  request_user_registration,
} from '../../../Redux/Actions/userAuthActions';
import {Field, Formik} from 'formik';
import {
  loginValidationSchema,
  phonenumberschema,
} from '../../../assets/Utils/validation';
import CustomeInput from '../../../components/core/TextInput';
import CButton from '../../../components/core/CButton';
import {Loader} from '../../../components/core/Loader';
import {sucessToast} from '../../../components/core/Toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Divider from '../../../components/core/Divider';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {AppImages} from '../../../assets/images';
import {COLORS} from '../../../assets/Theme/colors';
import {userFbLogin} from '../../../Redux/Services/api';

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
          dispatch(request_social_login(res.user.email, res.user.id, 'email'));
          // sucessToast('Sucess', 'User login Sucessfully,Please Verify OTP');
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

  const handleLogin = values => {
    console.log(values);
    if (values.password && values.email) {
      dispatch(request_user_login(values.email, values.password));
    }
  };

  async function fbsignin() {
    LoginManager.logOut();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          console.log('Login Cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;
            userFbLogin(accessToken).then(response => {
              console.log('Ress', response);
              dispatch(
                request_social_login({
                  email: response.email,
                  social_id: response.id,
                  social_type: 'facebook',
                }),
              );
            });
          });
        }
      })
      .catch(e => console.log(e));
  }

  const onPressForgotPass = () => navigation.navigate('ForgotPassword');

  return (
    <View style={styles.container}>
      <Header title={'Google Login'} />
      <View style={styles.inner_container}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}> */}
        <GoogleButton
          onPress={handleGoogleLogin}
          image={AppImages.google_icon}
          title={'Google'}
        />
        <GoogleButton
          image={AppImages.facebook_icon}
          onPress={fbsignin}
          title={'Facebook'}
        />
        <Divider />
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, {resetForm}) => {
            handleLogin(values);
            resetForm();
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomeInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <TouchableOpacity onPress={onPressForgotPass}>
                <Text style={styles.forgot_password}>Forgot Password?</Text>
              </TouchableOpacity>
              <CButton
                title={'Login'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <TouchableOpacity
                style={styles.signupview}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={{color: COLORS.black}}>
                  Don’t have an account?
                </Text>
                <Text style={styles.signup_text}>SignUp</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        {/* {generateOtp && (
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
          )} */}
        {/* </ScrollView> */}
      </View>
      {isLoading && <Loader />}
    </View>
  );
}
