import {Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import styles from './style';
import Header from '../../../components/core/Header';
import {Field, Formik} from 'formik';
import CustomeInput from '../../../components/core/TextInput';
import {ForgotPassvalidation} from '../../../assets/Utils/validation';
import CButton from '../../../components/core/CButton';
import {COLORS} from '../../../assets/Theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {request_forgot_pass_email} from '../../../Redux/Actions/userAuthActions';
import {Loader} from '../../../components/core/Loader';

export default function ForgotPassword({navigation}) {
  const loading = useSelector(state => state?.params.loading);
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleOtpSend = values => {
    console.log(values);
    if (values.email) {
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('Generated FP OTP', otp);
      dispatch(request_forgot_pass_email(values.email, otp));
      navigation.navigate('ForgotPassOtp', {email: values.email, otp: otp});
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Forgot Password'} isBack />
      <View style={styles.inner_container}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
          }}
          validationSchema={ForgotPassvalidation}
          onSubmit={(values, {resetForm}) => {
            console.log('values', values);
            handleOtpSend(values);
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
              <CButton
                title={'Send OTP'}
                onPress={handleSubmit}
                disabled={!isValid}
                borderRadius={20}
              />
              <TouchableOpacity
                style={styles.signupview}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{color: COLORS.black}}>Remember Password?</Text>
                <Text style={styles.signup_text}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
      {loading && <Loader />}
    </View>
  );
}
