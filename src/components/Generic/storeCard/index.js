import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function StoreCard(props) {
  const {title, bgColor, url} = props;
  return (
    <TouchableOpacity style={[styles.card_view, {backgroundColor: bgColor}]}>
      <View style={styles.logo_view}>
        <Image source={{uri: url}} style={styles.store_image} />
      </View>
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
    elevation: 2,
    padding: 10,
    gap: 5,
  },
  card_title: {
    fontSize: 12,
    color: COLORS.primary,
    textAlign: 'left',
  },
  logo_view: {
    height: 40,
    width: 100,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  store_image: {
    resizeMode: 'center',
    height: 40,
    width: 100,
  },
});
