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
});

module.exports = {
  ...styles,
};
