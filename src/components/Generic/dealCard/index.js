import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import config from '../../../react-native-config';
import {ImageBackground} from 'react-native';

export default function DealCard(props) {
  const {
    title,
    bgColor,
    url,
    slug,
    retail_price,
    offer_price,
    cash_back,
    isOffer,
    onPressShowModal,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={onPressShowModal}>
      <ImageBackground
        style={styles.image_container}
        source={{uri: url ? url : config.EMPTY_IMAGE_URL}}>
        {isOffer && (
          <View style={styles.card_content}>
            <Text style={styles.cashback_title}>{cash_back}</Text>
          </View>
        )}
      </ImageBackground>
      <Text style={styles.card_title}>{title}</Text>
      <Text style={styles.slug_title} numberOfLines={2}>
        {slug}
      </Text>
      <View style={styles.price_view}>
        <Text style={styles.retail_title}>{retail_price}</Text>
        <Text style={styles.offer_title}>{offer_price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
    padding: 15,
    backgroundColor: COLORS.white,
    marginVertical: 8,
    elevation: 5,
    borderRadius: 10,
    marginRight: 15,
  },
  image_container: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  card_title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: 5,
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center',
  },
  slug_title: {
    fontSize: 12,
    color: COLORS.primary,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  price_view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  offer_title: {
    color: COLORS.green_approved,
    fontSize: 12,
    fontWeight: '600',
  },
  retail_title: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  card_content: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-end',
    marginTop: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
    padding: 4,
  },
  cashback_title: {
    fontSize: 10,
    color: COLORS.white,
  },
});
