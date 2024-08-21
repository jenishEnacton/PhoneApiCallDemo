import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import StoreCard from '../../components/Generic/storeCard';
import config from '../../react-native-config';
import {useDispatch} from 'react-redux';
import {request_store_details} from '../../Redux/Actions/publicData';

export default function HomePopularStore(props) {
  const {item} = props;
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    item.categories[0]?.name || '',
  );

  const handleCategorySelect = category => {
    setSelectedCategory(category.name);
  };

  const renderHeader = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.list_header_view,
          {
            borderBottomWidth: selectedCategory === item.name ? 1 : 0,
            borderBottomColor:
              selectedCategory === item.name ? COLORS.secondary : COLORS.grey,
          },
        ]}
        onPress={() => handleCategorySelect(item)}>
        <Text
          style={{
            color:
              selectedCategory === item.name ? COLORS.secondary : COLORS.grey,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectedCategoryData = item.categories.find(
    category => category.name === selectedCategory,
  );

  const stores = selectedCategoryData ? selectedCategoryData.stores : [];

  const renderStoreCard = ({item, index}) => {
    return (
      <StoreCard
        title={item.name ? item.name : 'No Title'}
        bgColor={get_bg_color(index, 2)}
        url={item?.logo ? item?.logo : config.EMPTY_IMAGE_URL}
        cash_back={item?.cashback_string ? item?.cashback_string : ''}
        isOffer={item?.cashback_string ? true : false}
        onPressStore={() => dispatch(request_store_details(item.id))}
      />
    );
  };

  const EmptystoreCard = () => {
    return (
      <StoreCard
        title={'No Data'}
        url={config.EMPTY_IMAGE_URL}
        bgColor={COLORS.light_primary}
      />
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.list_title} numberOfLines={1}>
          {item.title.en}
        </Text>
        <FlatList
          data={item.categories}
          renderItem={renderHeader}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={stores}
        renderItem={renderStoreCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={EmptystoreCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  list_header_view: {
    margin: 10,
  },
  list_title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
    width: 120,
  },
});
