import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import CloseButton from '../../core/CloseButton';
import config from '../../../react-native-config';
import {AppImages} from '../../../assets/images';
import {trasnlate} from '../../../translations';
import {SvgUri} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

export default function CouponModal(props) {
  const {onPressVisible, onRequestClose, item} = props;
  const isSvg = item?.store?.logo?.endsWith('.svg');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={onPressVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.container} activeOpacity={1}>
        <View style={styles.inner_view}>
          <CloseButton onPressClose={onRequestClose} />
          <View style={{gap: 3}}>
            <View style={!isSvg ? styles.logo_view : {alignSelf: 'center'}}>
              {isSvg ? (
                <SvgUri uri={item?.store?.logo} />
              ) : (
                <Image
                  source={{
                    uri: item?.store?.logo
                      ? item?.store?.logo
                      : config.EMPTY_IMAGE_URL,
                  }}
                  style={styles.image_logo}
                />
              )}
            </View>
            <Text style={styles.title_sty}>{item?.title}</Text>
            {item?.store?.cashback_enabled && item?.store.cashback_string ? (
              <View style={styles.cb_view}>
                <Image
                  source={AppImages.cb_string_icon}
                  style={styles.curr_logo}
                />
                <Text style={styles.cashBack_title}>
                  {item?.store.cashback_string}
                </Text>
              </View>
            ) : null}
            {item?.description ? (
              <Text style={styles.description_text}>{item?.description}</Text>
            ) : null}
            {item.code ? (
              <TouchableOpacity style={styles.coupon_code}>
                <Image
                  source={AppImages.cb_icon}
                  style={styles.cashback_icon}
                />
                <Text style={styles.coupon_code_text}>{item?.code}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.empty_coupon} />
            )}
            <TouchableOpacity style={styles.shopnow_btn}>
              <Text style={styles.btn_text}>{trasnlate('shop_now')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    width: '100%',
  },
  inner_view: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    gap: 5,
  },
  image_logo: {
    width: 40,
    height: 100,
    resizeMode: 'contain',
  },
  logo_view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 5,
    height: 60,
    width: 150,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginVertical: 15,
  },

  title_sty: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.blackText,
    textAlign: 'center',
    marginBottom: 10,
  },
  cashBack_title: {
    fontSize: 14,
    color: COLORS.secondary,
    marginLeft: 8,
  },
  curr_logo: {
    height: 14,
    width: 14,
  },
  cb_view: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  description_text: {
    fontSize: 12,
    color: COLORS.blackText,
    marginVertical: 10,
    textAlign: 'center',
  },

  cashback_icon: {
    height: 10,
    width: 14,
  },
  coupon_code: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.secondary,
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 3,
    paddingVertical: 5,
    maxWidth: '80%',
    minWidth: '40%',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.coupon_code_bg_color,
    alignSelf: 'center',
    marginTop: 20,
  },
  empty_coupon: {
    maxWidth: '80%',
  },
  coupon_code_text: {
    color: COLORS.secondary,
    marginLeft: 5,
    fontSize: 10,
  },
  shopnow_btn: {
    backgroundColor: COLORS.primary,
    width: windowWidth - 80,
    borderRadius: 20,
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  btn_text: {
    color: COLORS.white,
    textAlign: 'center',
    width: '100%',
    fontSize: 15,
    fontWeight: '400',
  },
});
