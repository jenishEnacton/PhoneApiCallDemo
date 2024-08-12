import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function Divider() {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.or}>Or</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.2,
    width: '20%',
    borderColor: COLORS.dark,
  },
  or: {
    fontSize: 16,
    color: COLORS.dark,
    marginHorizontal: 10,
  },
});
