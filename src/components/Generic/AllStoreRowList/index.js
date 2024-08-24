import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import {trasnlate} from '../../../translations/index';
import config from '../../../react-native-config';
import CashBackString from '../../core/CashBackString';
import {SvgUri} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {request_store_details} from '../../../Redux/Actions/publicData';
const windowWidth = Dimensions.get('window').width;

export default function AllStoreRowList(props) {
  const lists = props.list;
  const dispatch = useDispatch();

  const renderStores = ({item, index}) => {
    const isSvg = item?.logo?.endsWith('.svg');
    let cashback_string = item.cashback_string
      ?.replace('Upto ', '')
      ?.replace('Flat ', '');
    return (
      <TouchableOpacity
        key={index.toString()}
        style={styles.st_card}
        onPress={() => dispatch(request_store_details(item.id))}>
        <View
          style={[styles.st_logo_box, {alignItems: isSvg ? 'center' : null}]}>
          {isSvg ? (
            <SvgUri uri={item?.logo} height={40} width={40} />
          ) : (
            <Image
              source={{
                uri: item.logo ? item.logo : config.EMPTY_IMAGE_URL,
              }}
              style={styles.st_logo}
            />
          )}
        </View>
        <View style={{gap: 4}}>
          <Text style={styles.st_name} numberOfLines={1}>
            {item.name}
          </Text>
          <CashBackString cash_back={cashback_string} />
          <Text style={styles.st_offers}>
            {item.offers_count} {trasnlate('offers')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.list_view}>
      <FlatList
        data={lists}
        renderItem={renderStores}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list_view: {
    width: windowWidth,
    marginBottom: 10,
    marginTop: 30,
  },
  st_card: {
    flexDirection: 'row',
    marginRight: 15,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.border_light,
    paddingTop: 20,
    borderRadius: 10,
    paddingLeft: 5,
  },
  st_logo: {
    width: 60,
    height: 45,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  st_name: {
    fontSize: 14,
    width: 130,
    maxWidth: 200,
    color: COLORS.black,
    fontWeight: '500',
  },
  st_cb: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 2,
    width: 130,
    flexShrink: 1,
  },
  cb_style: {
    marginBottom: 0,
  },
  st_offers: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 3,
    width: 120,
  },
  st_logo_box: {
    backgroundColor: COLORS.white,
    height: 45,
    marginLeft: 5,
    width: 70,
    marginRight: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
  },
});
