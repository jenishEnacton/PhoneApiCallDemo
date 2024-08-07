// Library Imports
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/Theme/colors';

// Common loader component
export const Loader = () => {
  return (
    <View style={localStyle.main}>
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
