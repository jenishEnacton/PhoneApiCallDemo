import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  emptyListText: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
});
