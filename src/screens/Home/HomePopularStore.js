import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import StoreCard from '../../components/Generic/storeCard';
import config from '../../react-native-config';

export default function HomePopularStore(props) {
  const {item} = props;

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
              selectedCategory === item.name ? COLORS.secondary : COLORS.black,
          },
        ]}
        onPress={() => handleCategorySelect(item)}>
        <Text
          style={{
            color:
              selectedCategory === item.name ? COLORS.secondary : COLORS.black,
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
        url={item.logo ? item.logo : config.EMPTY_IMAGE_URL}
      />
    );
  };

  const EmptystoreCard = () => {
    return <StoreCard title={'No Data'} />;
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
