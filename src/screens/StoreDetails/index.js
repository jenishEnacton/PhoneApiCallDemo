import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {styles} from './style';
import Header from '../../components/core/Header';
import Icons from '../../assets/icons';
import {COLORS, get_bg_color} from '../../assets/Theme/colors';
import config from '../../react-native-config';
import CashBackString from '../../components/core/CashBackString';
import {trasnlate} from '../../translations';
import CloseButton from '../../components/core/CloseButton';
import BottomModal from '../../components/core/BottomModal';
import HTMLView from 'react-native-htmlview';
import {fontStyles} from '../../assets/Theme/fontStyle';
import ScrollContent from '../../components/core/ScrollContent';
import {get_constructed_cashback} from '../../assets/Utils/validation';
import LinearGradient from 'react-native-linear-gradient';
import StoreCouponCard from '../../components/Generic/storeCuponCard';
import GradientFooter from '../../components/Generic/GradientFooter';
import {AppImages} from '../../assets/images';
import {SvgUri} from 'react-native-svg';

export default function StoreDetails() {
  const store = useSelector(state => state?.params?.store_details);
  const [selected, setSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTtype, setModalType] = useState('');

  const isSvg = store?.store?.logo?.endsWith('.svg');

  const cb_rates = store?.store?.cashback
    ? [...store?.store?.cashback.slice(0, 3)]
    : [];

  const onPressLike = () => {
    setSelected(!selected);
  };

  const coupons = [];

  const modalRef = useRef(null);

  const hiw = store?.static_blocks?.store_hiw[0]?.attrs?.blocks
    ? store?.static_blocks?.store_hiw[0]?.attrs?.blocks
    : null;

  const terms = store?.static_blocks?.store_terms[0]?.attrs?.message
    ? store?.static_blocks?.store_terms[0]?.attrs?.message
    : null;

  const render_empty_coupon_list = () => {
    return (
      <View style={styles.empty_cp_view}>
        <Text style={styles.empty_coupon_list}>{trasnlate('no_coupon')}</Text>
      </View>
    );
  };

  const renderCouponList = ({item, index}) => {
    return (
      <StoreCouponCard
        title={item.title ? item.title : null}
        bgColor={get_bg_color(index, 4)}
        url={item?.store?.logo ? item?.store?.logo : config.EMPTY_IMAGE_URL}
        cash_back={
          item?.store?.cashback_string ? item?.store?.cashback_string : ''
        }
        isCode={item?.code ? true : false}
        offer_code={item?.code ? item?.code : null}
        isOffer={item?.store?.cashback_string ? true : false}
        maincard={styles.cpn}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header isBack title={store?.store?.name} />
      <View style={styles.inner_container} />
      <View style={styles.card_view}>
        <TouchableOpacity style={styles.like_view} onPress={onPressLike}>
          <Icons.AntDesign
            name={selected ? 'heart' : 'hearto'}
            size={18}
            color={selected ? COLORS.secondary : COLORS.primary}
          />
        </TouchableOpacity>
        <View style={styles.logo_view}>
          {isSvg ? (
            <SvgUri uri={store?.store?.logo} height={50} width={50} />
          ) : (
            <Image
              source={{
                uri: store?.store?.logo
                  ? store?.store?.logo
                  : config.EMPTY_IMAGE_URL,
              }}
              style={styles.logo}
            />
          )}
        </View>
        {store?.store?.cashback_string ? (
          <CashBackString
            cash_back={store?.store?.cashback_string}
            extra_sty={styles.cash_back_str}
            extra_text={styles.cash_back_text}
          />
        ) : null}
        <TouchableOpacity style={styles.shopnow_btn}>
          <Text style={styles.btn_text}>{trasnlate('shop_now')}</Text>
        </TouchableOpacity>
        <View style={styles.card_bottom_view}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setModalType('how_works');
            }}>
            <Text style={styles.card_bottom_text}>
              {trasnlate('how_works')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setModalType('terms_and_conditions');
            }}>
            <Text>{trasnlate('terms_condition')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollContent scrollEventThrottle={16}>
        <View>
          <View style={styles.data_container}>
            {store?.store?.cashback_enabled ? (
              <View style={styles.tr_main_view}>
                <View style={styles.tr_view}>
                  <Text style={styles.tr_title}>
                    {trasnlate('track_within')}
                  </Text>
                  <Text style={styles.tr_desc}>
                    {store?.store?.tracking_speed
                      ? store?.store?.tracking_speed
                      : '30 Days'}
                  </Text>
                </View>
                <View style={styles.verticalSeparator} />
                <View style={styles.tr_view}>
                  <Text style={styles.tr_title}>
                    {trasnlate('paid_within')}
                  </Text>
                  <Text style={styles.tr_desc}>
                    {store?.store?.confirm_days
                      ? store?.store?.confirm_days
                      : null}
                  </Text>
                </View>
                <View style={styles.verticalSeparator} />
                <View style={styles.tr_view}>
                  <Text style={styles.tr_title}>
                    {trasnlate('missing_cashback')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={[styles.tr_desc, {marginRight: 5}]}>
                      {store?.store?.is_claimable
                        ? trasnlate('allowed')
                        : trasnlate('not_allowed')}
                    </Text>
                    {store?.store?.is_claimable ? (
                      <Icons.FontAwesome
                        name={'check-circle'}
                        size={16}
                        color={COLORS.green_approved}
                      />
                    ) : (
                      <Icons.Entypo
                        name={'circle-with-cross'}
                        size={16}
                        color={COLORS.error}
                      />
                    )}
                  </View>
                </View>
              </View>
            ) : null}
            {cb_rates.length > 0 && store.store?.cashback_enabled ? (
              <>
                <Text style={styles.cr_title}>
                  {trasnlate('cashback_rates')}
                </Text>
                <View style={styles.cb_card}>
                  {cb_rates.map((e, index) => {
                    return (
                      <View
                        style={[
                          styles.cb_row,
                          cb_rates.length - 1 == index
                            ? {borderBottomWidth: 0}
                            : {},
                        ]}
                        key={index.toString()}>
                        <Text style={styles.cb_rate_title}>{e.title}</Text>
                        <Text style={styles.cb_text}>
                          {get_constructed_cashback(e.rate_type, e.cashback)}
                        </Text>
                      </View>
                    );
                  })}
                  {store.store?.cashback?.length > 2 ? (
                    <TouchableOpacity
                      style={styles.view_more_btn}
                      onPress={() => {
                        setModalVisible(true), setModalType('cashback_rates');
                      }}>
                      <LinearGradient
                        style={[styles.view_more_cb]}
                        colors={[COLORS.secondary, COLORS.cb_rates]}
                        start={{x: 1, y: 1}}
                        end={{x: 0, y: 0}}>
                        <Text style={styles.view_more_text}>
                          {trasnlate('view_more')}
                        </Text>
                        <Icons.FontAwesome
                          name={'chevron-down'}
                          size={14}
                          style={styles.down_arrow}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            ) : null}
            <View>
              <Text style={styles.co_title}>{trasnlate('coupon_offers')}</Text>
              {coupons.length ? (
                <FlatList
                  data={coupons}
                  style={styles.list}
                  columnWrapperStyle={styles.row}
                  numColumns={2}
                  renderItem={renderCouponList}
                  keyExtractor={(item, index) => item.id + index.toString()}
                  ListEmptyComponent={() => render_empty_coupon_list()}
                />
              ) : (
                render_empty_coupon_list()
              )}
            </View>
          </View>
          <GradientFooter
            btn_title={trasnlate('view_deals')}
            main_title={`${trasnlate('view_daily_deals_from')} \n ${
              store?.store?.name
            }`}
            main_title_style={styles.main_footer_title}
            source={AppImages.gr_store_img}
            img_sty={styles.footer_image}
            gradientStyle={{paddingHorizontal: 20}}
          />
        </View>
      </ScrollContent>
      <BottomModal
        ref={modalRef}
        visible_modal={modalVisible}
        close_modal={() => setModalVisible(false)}>
        <View>
          <CloseButton onPressClose={() => setModalVisible(false)} />
          {modalTtype === 'how_works' ? (
            <>
              <Text style={styles.hiw_modal_title}>
                {trasnlate('how_works')}
              </Text>
              {hiw
                ? hiw.map((e, index) => (
                    <View style={styles.hiw_row} key={index}>
                      <Text style={styles.hiw_num}>{index + 1}</Text>
                      <View>
                        <Text style={styles.hiw_title}>{e.title.en}</Text>
                        <Text style={styles.hiw_desc}>{e.content.en}</Text>
                      </View>
                    </View>
                  ))
                : null}
            </>
          ) : modalTtype === 'terms_and_conditions' ? (
            <>
              <Text style={styles.hiw_modal_title}>
                {trasnlate('terms_condition')}
              </Text>
              <ScrollView>
                <HTMLView
                  style={styles.terms_content}
                  value={terms?.en || null}
                  stylesheet={StyleSheet.create({
                    ...fontStyles.html_view_txtStyles,
                  })}
                />
              </ScrollView>
            </>
          ) : modalTtype === 'cashback_rates' ? (
            <>
              <ScrollView
                style={styles.cb_modal_content}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.cr_modal_title}>
                  {trasnlate('cashback_rates')}
                </Text>
                {store.store?.cashback
                  ? store.store?.cashback.map((e, index) => {
                      return (
                        <View style={styles.cb_row} key={index.toString()}>
                          <Text style={styles.cb_rate_title}>{e.title}</Text>
                          <Text style={styles.cb_text}>
                            {get_constructed_cashback(e.rate_type, e.cashback)}
                          </Text>
                        </View>
                      );
                    })
                  : null}
              </ScrollView>
            </>
          ) : null}
        </View>
      </BottomModal>
    </View>
  );
}
