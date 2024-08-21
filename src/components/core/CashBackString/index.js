import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppImages} from '../../../assets/images';
import {COLORS} from '../../../assets/Theme/colors';

export default function CashBackString(props) {
  const {cash_back, extra_sty, extra_text} = props;
  return (
    <View style={[styles.cashBackView, extra_sty]}>
      <Image source={AppImages.cb_string_icon} style={styles.cashback_icon} />
      <Text style={[styles.cashBack_str, extra_text]}>{cash_back}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cashBack_str: {
    fontSize: 11,
    color: COLORS.secondary,
  },
  cashback_icon: {
    height: 14,
    width: 14,
  },
  cashBackView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
