import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function Header(props) {
  const {title} = props;
  return (
    <View style={styles.header_view}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header_view: {
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: COLORS.light_primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
