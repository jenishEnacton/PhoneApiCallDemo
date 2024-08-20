// Library Imports
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/Theme/colors';

export const Loader = props => {
  const {extra_style} = props;
  return (
    <View style={[localStyle.main, {backgroundColor: extra_style}]}>
      <ActivityIndicator size={'large'} color={COLORS.secondary} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  main: {
    backgroundColor: COLORS.light_primary,
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
