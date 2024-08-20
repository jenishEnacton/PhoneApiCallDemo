import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import {AppImages} from '../../../assets/images';

export default function StoreCouponCard(props) {
  const {title, bgColor, url, cash_back, isOffer, onPressShowModal} = props;
  return (
    <TouchableOpacity
      style={[styles.card_view, {backgroundColor: bgColor}]}
      onPress={onPressShowModal}>
      <View style={styles.logo_view}>
        <Image source={{uri: url}} style={styles.store_image} />
        {isOffer && (
          <>
            <Image source={AppImages.cb_string_icon} style={styles.curr_logo} />
            <Text style={styles.cashBack_title}>{cash_back}</Text>
          </>
        )}
      </View>
      <Text style={styles.card_title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card_view: {
    width: 210,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.light_primary,
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    elevation: 2,
    padding: 15,
    gap: 5,
    gap: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  store_image: {
    resizeMode: 'contain',
    height: 40,
    width: 100,
    marginRight: 8,
  },
  cashBack_title: {
    fontSize: 10,
    color: COLORS.secondary,
    marginLeft: 5,
  },
  curr_logo: {
    height: 20,
    width: 20,
  },
});
