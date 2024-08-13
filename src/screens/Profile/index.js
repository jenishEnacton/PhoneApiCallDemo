import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/Theme/colors';
import {trasnlate} from '../../translations';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trasnlate('login')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    color: COLORS.black,
  },
});
