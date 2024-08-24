import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import config from '../../../react-native-config';
import {useDispatch} from 'react-redux';
import {
  request_coupon_cat_details,
  request_store_cat_details,
} from '../../../Redux/Actions/publicData';
import {useNavigation} from '@react-navigation/native';

export default function CatCard(props) {
  const {cat, bg_color, data_type} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handle_cat_click() {
    if (data_type === 'store') {
      dispatch(request_store_cat_details(cat.id, cat));
    }
    if (props.data_type === 'coupon') {
      dispatch(request_coupon_cat_details(cat.id));
    }
    if (props.data_type === 'deal') {
      navigation.navigate('AllDeals', {
        cats: [cat.id],
        title: cat.name.en ? cat.name.en : cat.name,
      });
    }
  }
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          handle_cat_click();
        }}
        style={[styles.category_container, {backgroundColor: bg_color}]}>
        <Image
          source={{uri: cat?.icon ? cat?.icon : config.EMPTY_IMAGE_URL}}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.category_title}>
        {cat?.name ? cat?.name : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
