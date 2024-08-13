import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function StoreCard(props) {
  const {title} = props;
  return (
    <TouchableOpacity style={styles.card_view}>
      <Text style={styles.card_title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card_view: {
    width: 170,
    marginVertical: 8,

    borderRadius: 10,
    backgroundColor: COLORS.light_primary,
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
    height: 90,
    shadowColor: COLORS.black,
    elevation: 5,
    padding: 15,
  },
  card_title: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'left',
  },
});
