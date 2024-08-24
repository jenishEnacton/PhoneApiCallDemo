import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import Header from '../../components/core/Header';
import {useSelector} from 'react-redux';
import {trasnlate} from '../../translations';

export default function CouponCatDetails() {
  const coupon_cat = useSelector(state => state?.params?.coupon_cat_details);

  const ListEmpty = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>{trasnlate('no-coupon_found')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        isBack
        title={coupon_cat?.category?.name ? coupon_cat?.category?.name : ''}
      />
      <View style={styles.content}>
        <FlatList
          data={coupon_cat?.coupons?.coupons}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item?.name}</Text>
            </View>
          )}
          keyExtractor={item => item?.id.toString()}
          ListEmptyComponent={ListEmpty}
        />
      </View>
    </View>
  );
}
