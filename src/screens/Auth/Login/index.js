import {Alert, Button, View} from 'react-native';
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

export default function Login({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    // try {
    //   await GoogleLogin()
    //     .then(res => {
    //       setuserInfo(res.user.email);
    //       setidToken(res.idToken);
    //       console.log('Res', res.user.email);
    //       Alert.alert('User login Sucessfully');
    //       if (res) {
    //         let min = Math.ceil(1000);
    //         let max = Math.floor(9999);
    //         let otp = Math.floor(Math.random() * (max - min + 1)) + min;
    //         console.log(otp);
    //         dispatch(request_user_email_otp(res.user.email, otp, false));
    //       }
    //     })
    //     .catch(err => console.log(err));
    // } catch (apiError) {
    //   setError(
    //     apiError?.response?.data?.error?.message || 'Something went wrong',
    //   );
    // }
  };

  const handleNumSubmt = async val => {
    if (val) {
      setIsLoading(true);
      let min = Math.ceil(1000);
      let max = Math.floor(9999);
      let otp = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('Generated OTP', otp);
      // dispatch(request_user_email_otp(val.phoneNumber, otp));
      navigation.navigate('OtpScreen', {otp: otp});
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Google Login'} />
      <View style={styles.inner_container}>
        <GoogleButton onPress={handleGoogleLogin} />
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
      </View>
      {isLoading && <Loader />}
    </View>
  );
}
