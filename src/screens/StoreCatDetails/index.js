import {ImageBackground, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/core/Header';
import {styles} from './style';
import config from '../../react-native-config';
import {COLORS} from '../../assets/Theme/colors';
import ScrollContent from '../../components/core/ScrollContent';
import AllStoreRowList from '../../components/Generic/AllStoreRowList';
import {Loader} from '../../components/core/Loader';

export default function StoreCatDetails() {
  const data = useSelector(state => state?.params?.store_cat_details);
  const all_stores_keys = data ? Object.keys(data) : [];
  const store_cat = useSelector(state => state?.params?.store_cat);
  const loading = useSelector(state => state?.params?.loading);

  return (
    <View style={styles.container}>
      <Header isBack title={store_cat?.name ? store_cat?.name : null} />
      <View style={{flex: 1}}>
        <View style={styles.inner_container} />
        <View style={styles.card_view}>
          <ImageBackground
            source={{
              uri: store_cat?.header_image
                ? store_cat?.header_image
                : config.EMPTY_IMAGE_URL,
            }}
            style={[
              styles.back_image,
              {
                justifyContent: !store_cat?.header_image
                  ? 'center'
                  : 'flex-end',
              },
            ]}>
            <View style={styles.overlay}>
              <Text style={styles.image_title}>
                {store_cat?.name ? store_cat?.name : null}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 1, marginTop: 30}}>
          <ScrollContent
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: 15,
            }}
            scrollEventThrottle={16}>
            {all_stores_keys
              ? all_stores_keys.map((item, index) => (
                  <View key={index.toString()} style={styles.store_card}>
                    <Text style={styles.store_name}>{item}</Text>
                    <AllStoreRowList list={data[item]} />
                  </View>
                ))
              : null}
          </ScrollContent>
        </View>
        {loading && <Loader extra_style={COLORS.white} />}
      </View>
    </View>
  );
}
