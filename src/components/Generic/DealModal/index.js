import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import CloseButton from '../../core/CloseButton';
import config from '../../../react-native-config';
import {printFormattedCurrency} from '../../../Redux/utils';
import {AppImages} from '../../../assets/images';
import {trasnlate} from '../../../translations';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {Loader} from '../../core/Loader';
import HTMLView from 'react-native-htmlview';
import {fontStyles} from '../../../assets/Theme/fontStyle';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DealModal(props) {
  const {onPressVisible, onRequestClose} = props;

  const deal = useSelector(state => state?.params?.deal_info);
  const loading = useSelector(state => state?.params?.loading);
  console.log(deal);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={onPressVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.container} activeOpacity={1}>
        <ScrollView
          style={styles.inner_view}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: 30}}>
            <CloseButton onPressClose={onRequestClose} />
            <View style={styles.modal_data}>
              <View style={styles.main_box}>
                <View style={styles.discount_box}>
                  <Text style={styles.discount_text}>{deal?.discount}</Text>
                </View>
                <TouchableOpacity style={styles.image_view}>
                  <Image
                    source={{
                      uri: deal?.store?.logo
                        ? deal?.store?.logo
                        : config.EMPTY_IMAGE_URL,
                    }}
                    style={styles.store_logo}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri: deal?.image ? deal?.image : config.EMPTY_IMAGE_URL,
                }}
                style={styles.deal_image}
              />
              <Text style={styles.deal_title} numberOfLines={3}>
                {deal?.title ? deal.title : deal?.post?.post_title}
              </Text>
              <View style={styles.price_view}>
                {deal?.store?.cashback_enabled &&
                deal?.store.cashback_string ? (
                  <Text style={styles.cashback_string}>
                    {deal?.store.cashback_string}
                  </Text>
                ) : (
                  <View style={styles.empty_view} />
                )}
                {deal?.retail_price ? (
                  <Text style={styles.retail_price}>
                    {printFormattedCurrency('$', deal.retail_price)}
                  </Text>
                ) : null}
              </View>
              {!loading && (
                <View style={styles.price_view}>
                  {deal?.code ? (
                    <TouchableOpacity style={styles.cpn_code}>
                      <Image
                        source={AppImages.cb_icon}
                        style={styles.cb_icon}
                      />
                      <Text style={styles.code}>{deal?.code}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.empty_view} />
                  )}
                  <View style={styles.offer_box}>
                    <Text style={styles.offer_price}>
                      {printFormattedCurrency('$', deal?.offer_price)}
                    </Text>
                  </View>
                </View>
              )}
              <HTMLView
                style={styles.deal_description}
                value={deal?.description ? deal?.description : 'No Description'}
                stylesheet={StyleSheet.create({
                  ...fontStyles.html_view_txtStyles,
                })}
              />
              {!loading && (
                <TouchableOpacity
                  style={[
                    styles.shopnow_btn,
                    {
                      marginTop: !deal?.description ? 20 : 0,
                      marginBottom: !deal?.expiry_date ? 20 : 5,
                    },
                  ]}>
                  <Text style={styles.btn_text}>{trasnlate('get_deal')}</Text>
                </TouchableOpacity>
              )}
              {deal?.expiry_date ? (
                <Text style={styles.expiry_date}>
                  {trasnlate('valid_until')}{' '}
                  {dayjs(deal?.expiry_date).format('DD-MM-YYYY')}
                </Text>
              ) : null}
            </View>
          </View>
          {loading && <Loader extra_style={'transparent'} />}
        </ScrollView>
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
    maxHeight: windowHeight - 200,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modal_data: {
    gap: 5,
  },
  store_logo: {
    height: 35,
    width: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  discount_text: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  image_view: {
    height: 40,
    width: 100,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.background,
  },
  main_box: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 50,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  discount_box: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    height: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.secondary,
  },
  deal_image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 5,
  },
  deal_title: {
    marginVertical: 10,
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    color: COLORS.blackText,
    fontWeight: '500',
  },
  retail_price: {
    textDecorationLine: 'line-through',
    color: COLORS.black,
    fontSize: 12,
    fontWeight: '500',
  },
  empty_view: {
    maxWidth: '80%',
  },
  cashback_string: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  price_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  code: {
    fontSize: 12,
    color: COLORS.secondary,
    marginLeft: 5,
  },
  cb_icon: {
    height: 10,
    width: 14,
  },
  cpn_code: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.secondary,
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 3,
    paddingVertical: 5,
    maxWidth: '50%',
    minWidth: '20%',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.coupon_code_bg_color,
  },
  expiry_date: {
    fontSize: 12,
    color: COLORS.grey,
    alignSelf: 'center',
    fontWeight: '600',
  },
  offer_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offer_price: {
    color: COLORS.green_approved,
    fontSize: 14,
    fontWeight: '700',
  },
  deal_description: {
    fontSize: 12,
    color: COLORS.blackText,
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  shopnow_btn: {
    backgroundColor: COLORS.primary,
    width: windowWidth - 80,
    borderRadius: 20,
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
