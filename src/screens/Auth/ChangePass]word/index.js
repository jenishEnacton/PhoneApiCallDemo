import {Text, View} from 'react-native';
import React, {useRef} from 'react';
import styles from './style.js';
import Header from '../../../components/core/Header/index.js';
import {Field, Formik} from 'formik';
import CustomeInput from '../../../components/core/TextInput/index.js';
import CButton from '../../../components/core/CButton/index.js';
import {ChangePasswordSchema} from '../../../assets/Utils/validation.js';
import {useDispatch, useSelector} from 'react-redux';
import {request_forgot_change_password} from '../../../Redux/Actions/userAuthActions.js';
import {Loader} from '../../../components/core/Loader/index.js';

export default function ChangePassword({route}) {
  const loading = useSelector(state => state?.params.loading);
  const {email, otp} = route?.params;
  console.log(email);
  console.log(otp);
  const dispatch = useDispatch();

  const handleChangePass = values => {
    if (values.password == values.confirmpassword) {
      dispatch(request_forgot_change_password(email, values.password, otp));
    }
  };

  const formikRef = useRef(null);
  return (
    <View style={styles.container}>
      <Header title={'Change Password'} />
      <View style={styles.inner_container}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            password: '',
            confirmpassword: '',
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, {resetForm}) => {
            handleChangePass(values);
            resetForm();
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <Field
                component={CustomeInput}
                name="password"
                placeholder="Pssword"
                secureTextEntry
              />
              <Field
                component={CustomeInput}
                name="confirmpassword"
                placeholder="Confirm Password"
                secureTextEntry
              />
              <CButton
                title={'Change Password'}
                onPress={handleSubmit}
                disabled={!isValid}
                borderRadius={20}
              />
            </>
          )}
        </Formik>
      </View>
      {loading && <Loader />}
    </View>
  );
}
