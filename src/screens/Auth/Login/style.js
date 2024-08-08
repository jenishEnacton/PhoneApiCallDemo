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

module.exports = {
  ...styles,
};
