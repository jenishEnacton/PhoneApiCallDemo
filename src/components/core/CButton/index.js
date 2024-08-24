import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function CButton(props) {
  let {
    title,
    onPress,
    extrasty,
    disabled,
    extra_title_sty,
    borderRadius,
    onLongPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, extrasty, {borderRadius: borderRadius}]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}>
      <Text style={[styles.btntitle, extra_title_sty]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: '70%',
    alignSelf: 'center',
  },
  btntitle: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
