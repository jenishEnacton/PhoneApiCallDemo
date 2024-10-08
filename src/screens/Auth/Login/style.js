import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/Theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inner_container: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: 50,
    // alignItems: 'center',
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
  signupview: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
  },
  signup_text: {
    color: COLORS.secondary,
  },
  forgot_password: {
    color: COLORS.secondary,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
});

module.exports = {
  ...styles,
};
