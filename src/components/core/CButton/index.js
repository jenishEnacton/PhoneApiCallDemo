import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function CButton(props) {
  let {title, onPress, extrasty, disabled} = props;
  return (
    <TouchableOpacity
      style={[styles.container, extrasty]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.btntitle}>{title}</Text>
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
