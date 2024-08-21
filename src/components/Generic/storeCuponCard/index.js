import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import {AppImages} from '../../../assets/images';
import Icons from '../../../assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {SuccessToast} from 'react-native-toast-message';
import {trasnlate} from '../../../translations';

export default function StoreCouponCard(props) {
  const {
    title,
    bgColor,
    url,
    cash_back,
    isOffer,
    onPressShowModal,
    isCode,
    offer_code,
    maincard,
  } = props;

  const [copiedText, setCopiedText] = useState('');

  function copyCode(offer_code) {
    Clipboard.setString(offer_code);
    SuccessToast('Sucess', trasnlate('copied'));
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <TouchableOpacity
      style={[styles.card_view, maincard, {backgroundColor: bgColor}]}
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
      {copiedText && <Text>{copiedText}</Text>}
      <View style={styles.cpn_code_wrapper}>
        {isCode ? (
          <TouchableOpacity
            style={styles.code_btn}
            onPress={() => copyCode(offer_code)}>
            <Image source={AppImages.cb_icon} style={styles.code_icon} />
            <Text style={styles.coupon_code}>{offer_code}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.code_empty} />
        )}
        <TouchableOpacity style={styles.arrow}>
          <Icons.FontAwesome name="chevron-right" color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card_view: {
    width: 250,
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
  cpn_code_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
    width: '95%',
  },
  code_icon: {
    height: 10,
    width: 14,
  },
  code_btn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.secondary,
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 7,
    paddingVertical: 5,
    maxWidth: '80%',
    minWidth: '40%',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.coupon_code_bg_color,
  },
  code_empty: {
    maxWidth: '80%',
  },
  coupon_code: {
    fontSize: 14,
    color: COLORS.secondary,
    marginLeft: 5,
  },
  arrow: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
  },
});
