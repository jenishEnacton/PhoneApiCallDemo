import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/Theme/colors';
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  empty_list_text: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 25,
  },
  list: {
    width: windowWidth,
    alignSelf: 'center',
    paddingBottom: 30,
    marginLeft: 15,
  },
  row: {
    justifyContent: 'space-around',
    flex: 1,
  },
});
