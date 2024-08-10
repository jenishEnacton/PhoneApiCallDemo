import {Text, View} from 'react-native';
import React, {useRef} from 'react';
import styles from './style';
import Header from '../../../components/core/Header';
import {loginValidationSchema} from '../../../assets/Utils/validation';
import {Field, Formik} from 'formik';
import CustomeInput from '../../../components/core/TextInput';
import CButton from '../../../components/core/CButton';
import {useDispatch} from 'react-redux';
import {request_user_registration} from '../../../Redux/Actions/userAuthActions';

export default function Signup() {
  const formikRef = useRef(null);
  const dispatch = useDispatch();

  const handleSignUp = values => {
    console.log(values);
    if (values.email && values.password) {
      dispatch(request_user_registration(values.email, values.password));
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'SignUp'} isBack />
      <View style={styles.inner_container}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, {resetForm}) => {
            handleSignUp(values);
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

              <CButton
                title={'Sign Up'}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}
