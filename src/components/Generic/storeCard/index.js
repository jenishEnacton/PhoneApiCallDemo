import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import CashBackString from '../../core/CashBackString';
import Icon from '../../../assets/icons';
import {SvgUri} from 'react-native-svg';

export default function StoreCard(props) {
  const {title, bgColor, url, cash_back, isOffer} = props;
  const [selected, setSelected] = useState(false);
  const onPressLike = () => {
    setSelected(!selected);
  };

  const isSvg = url?.endsWith('.svg');

  return (
    <TouchableOpacity style={[styles.card_view, {backgroundColor: bgColor}]}>
      <View style={styles.logo_view}>
        {isSvg ? (
          <SvgUri uri={url} height={40} width={40} style={styles.svg_image} />
        ) : (
          <Image source={{uri: url}} style={styles.store_image} />
        )}
      </View>
      <TouchableOpacity style={styles.like_view} onPress={onPressLike}>
        <Icon.AntDesign name={selected ? 'heart' : 'hearto'} size={18} />
      </TouchableOpacity>
      <Text style={styles.card_title}>{title}</Text>
      {isOffer && <CashBackString cash_back={cash_back} />}
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
    shadowColor: COLORS.black,
    elevation: 2,
    padding: 10,
    gap: 5,
  },
  card_title: {
    fontSize: 12,
    color: COLORS.primary,
    textAlign: 'left',
    marginTop: 17,
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
  like_view: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#FDA8A8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -15,
    marginTop: -60,
  },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svg_image: {
    alignSelf: 'center',
  },
});
