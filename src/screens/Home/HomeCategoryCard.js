import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import config from '../../react-native-config';

export default function HomeCategoryCard(props) {
  const {item} = props;

  const renderHeader = ({item, index}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={[
            styles.category_container,
            {backgroundColor: get_bg_color(index, 8)},
          ]}>
          <Image
            source={{uri: item?.icon ? item?.icon : config.EMPTY_IMAGE_URL}}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.category_title}>
          {item?.name ? item?.name : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.list_title}>
        {item?.title ? item?.title?.en : ''}
      </Text>
      <FlatList
        data={item?.categories}
        renderItem={renderHeader}
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
