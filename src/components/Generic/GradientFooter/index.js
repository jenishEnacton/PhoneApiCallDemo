import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../assets/Theme/colors';
import CButton from '../../core/CButton';
import config from '../../../react-native-config';

export default function GradientFooter(props) {
  const {
    gradientStyle,
    main_title,
    sub_title,
    btn_title,
    source,
    main_title_style,
    img_sty,
    sub_title_style,
    onPress,
  } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={[styles.gradientStyle, gradientStyle]}
        colors={[COLORS.secondary, COLORS.gradient_secondary]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <View style={styles.inner_container}>
          <View style={{gap: 2}}>
            <Text style={[styles.main_title_sty, main_title_style]}>
              {main_title}
            </Text>
            <Text style={[styles.sub_title_sty, sub_title_style]}>
              {sub_title}
            </Text>
          </View>
          <CButton
            title={btn_title}
            extrasty={styles.btn}
            extra_title_sty={{color: COLORS.white, fontSize: 14}}
            borderRadius={30}
            onPress={onPress}
          />
        </View>
        <Image
          source={source ? source : {uri: config.EMPTY_IMAGE_URL}}
          style={img_sty}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    marginTop: 8,
    alignItems: 'center',
    paddingBottom: 17,
    marginBottom: 20,
  },
  gradientStyle: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
  },
  main_title_sty: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '400',
  },
  sub_title_sty: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600',
  },
  btn: {
    width: 140,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  inner_container: {
    height: '100%',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
