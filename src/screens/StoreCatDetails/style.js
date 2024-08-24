import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inner_container: {
    height: 100,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    top: 50,
  },
  card_view: {
    width: '85%',
    backgroundColor: COLORS.white,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  back_image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  image_title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  store_name: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
});
