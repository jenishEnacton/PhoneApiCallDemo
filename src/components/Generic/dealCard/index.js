import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import config from '../../../react-native-config';

export default function DealCard(props) {
  const {title, bgColor, url, slug, retail_price, offer_price} = props;
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Image
        style={styles.image_container}
        source={{uri: url ? url : config.EMPTY_IMAGE_URL}}
      />
      <Text style={styles.card_title}>{title}</Text>
      <Text style={styles.slug_title} numberOfLines={2}>
        {slug}
      </Text>
      <View style={styles.price_view}>
        <Text style={styles.retail_title}>{retail_price}</Text>
        <Text style={styles.offer_title}>{offer_price}</Text>
      </View>
    </View>
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
    gap: 10,
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
});
