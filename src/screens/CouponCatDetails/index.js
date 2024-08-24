import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Header from '../../components/core/Header';
import {useDispatch, useSelector} from 'react-redux';
import {trasnlate} from '../../translations';
import {request_filtered_coupons} from '../../Redux/Actions/publicData';
import {Loader} from '../../components/core/Loader';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import config from '../../react-native-config';
import StoreCouponCard from '../../components/Generic/storeCuponCard';
import CouponModal from '../../components/Generic/CouponModal';

export default function CouponCatDetails() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState('');
  const [show, setShow] = useState(false);
  const coupon_cat = useSelector(state => state?.params?.coupon_cat_details);
  const loading = useSelector(state => state?.params?.loading);
  const coupons = useSelector(
    state => state?.params?.filtered_coupons_data?.coupons || [],
  );

  const coupon_cat_details = useSelector(
    state => state?.params?.coupon_cat_details || {},
  );

  useEffect(() => {
    dispatch(
      request_filtered_coupons(
        [coupon_cat_details?.category?.id],
        [],
        'popular',
        1,
        null,
        null,
        'CouponCatDetails',
      ),
    );
  }, [coupon_cat]);

  const ListEmpty = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>{trasnlate('no-coupon_found')}</Text>
      </View>
    );
  };

  const renderCoupon = ({item, index}) => {
    return (
      <StoreCouponCard
        title={item.title ? item.title : null}
        bgColor={get_bg_color(index, 4)}
        url={item?.store?.logo ? item?.store?.logo : config.EMPTY_IMAGE_URL}
        cash_back={
          item?.store?.cashback_string ? item?.store?.cashback_string : ''
        }
        isCode={item?.code ? true : false}
        offer_code={item?.code ? item?.code : null}
        isOffer={item?.store?.cashback_string ? true : false}
        onPressShowModal={() => {
          setShow(true);
          setSelectedItem(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        isBack
        title={
          coupon_cat_details.category?.name
            ? coupon_cat_details.category?.name
            : ''
        }
      />
      <View style={{flex: 1}}>
        <View style={styles.content}>
          <FlatList
            data={coupons}
            renderItem={renderCoupon}
            keyExtractor={item => item?.id.toString()}
            ListEmptyComponent={ListEmpty}
          />
        </View>
        <CouponModal
          onPressVisible={show}
          onRequestClose={() => setShow(false)}
          item={selectedItem}
        />
        {loading && <Loader extra_style={COLORS.white} />}
      </View>
    </View>
  );
}
