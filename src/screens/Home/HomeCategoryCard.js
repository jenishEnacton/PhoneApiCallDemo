import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import CatCard from '../../components/Generic/CatCard';

export default function HomeCategoryCard(props) {
  const {item, navigation} = props;

  const render_store_cat = ({item, index}) => {
    return (
      <CatCard
        cat={item}
        bg_color={get_bg_color(index, 8)}
        data_type={'store'}
        navigation={navigation}
      />
    );
  };
  const render_categories = ({item, index}) => {
    return (
      <CatCard
        cat={item}
        bg_color={get_bg_color(index, 8)}
        data_type={'coupon'}
        navigation={navigation}
      />
    );
  };
  const render_deal_cat = ({item, index}) => {
    return (
      <CatCard
        cat={item}
        bg_color={get_bg_color(index, 8)}
        data_type={'deal'}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.list_title}>
        {item?.title ? item?.title?.en : ''}
      </Text>
      <FlatList
        data={item?.categories ? item?.categories : []}
        renderItem={
          item?.categories
            ? item?.category_type === 'CouponCategory'
              ? render_categories
              : item?.category_type === 'DealCategory'
              ? render_deal_cat
              : render_store_cat
            : render_store_cat
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },

  list_title: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical: 20,
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  category_container: {
    marginHorizontal: 18,
    padding: 10,
    borderRadius: 15,
    marginBottom: 7,
  },
  category_title: {
    width: 80,
    textAlign: 'center',
    color: COLORS.black,
  },
});
