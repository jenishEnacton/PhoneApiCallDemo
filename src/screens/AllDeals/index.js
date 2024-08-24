import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Header from '../../components/core/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  request_deal_info,
  request_deals_filter_info,
  request_filtered_deals,
} from '../../Redux/Actions/publicData';
import {Loader} from '../../components/core/Loader';
import DealCard from '../../components/Generic/dealCard';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import {printFormattedCurrency} from '../../Redux/utils';
import DealModal from '../../components/Generic/DealModal';
import config from '../../react-native-config';

export default function AllDeals({route}) {
  const {cats, title, store} = route.params;

  const dispatch = useDispatch();
  const loading = useSelector(state => state?.params?.loading);
  const filtered_deals_data = useSelector(
    state => state?.params?.filtered_deals_data || {},
  );
  const deals_filter_info = useSelector(
    state => state?.params?.deals_filter_info || {},
  );

  const [selectedItem, setSelectedItem] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(request_deals_filter_info(cats, store));
    dispatch(request_filtered_deals(cats, store));
  }, []);

  const renderDeal = ({item, index}) => {
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
        onPressShowModal={() => {
          dispatch(request_deal_info(item.id));
          setSelectedItem(item);
          setShow(true);
        }}
      />
    );
  };

  const emptyDealList = () => {
    return (
      <View>
        <Text style={styles.empty_list_text}>No deals found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header isBack title={title} />
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <FlatList
            data={filtered_deals_data.deals}
            keyExtractor={item => '_' + item.id}
            columnWrapperStyle={styles.row}
            style={styles.list}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderDeal}
            ListEmptyComponent={emptyDealList}
          />
        </View>
        <DealModal
          onPressVisible={show}
          onRequestClose={() => setShow(false)}
          item={selectedItem}
        />
        {loading && <Loader extra_style={COLORS.white} />}
      </View>
    </View>
  );
}
