import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import config from '../../react-native-config';
import DealCard from '../../components/Generic/dealCard';
import {printFormattedCurrency} from '../../Redux/utils';

export default function HomeDealCard(props) {
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

  const stores = selectedCategoryData ? selectedCategoryData.deals : [];

  const renderDealCard = ({item, index}) => {
    return (
      <DealCard
        title={item.store.name ? item.store.name : 'No title'}
        bgColor={get_bg_color(index, 8)}
        url={item.image ? item.image : config.EMPTY_IMAGE_URL}
        slug={item.slug ? item.slug : 'No Slug'}
        retail_price={
          item.retail_price
            ? printFormattedCurrency('$', item.retail_price)
            : ''
        }
        offer_price={
          item.offer_price ? printFormattedCurrency('$', item.offer_price) : ''
        }
        cash_back={item.cashback_string ? item.cashback_string : ''}
        isOffer={item.cashback_string ? true : false}
      />
    );
  };

  const EmptystoreCard = () => {
    return <DealCard title={'No Data'} bgColor={COLORS.light_primary} />;
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
        renderItem={renderDealCard}
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
