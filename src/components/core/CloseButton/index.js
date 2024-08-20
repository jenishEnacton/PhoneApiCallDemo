import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppImages} from '../../../assets/images';
import {COLORS} from '../../../assets/Theme/colors';

export default function CloseButton(props) {
  const {onPressClose} = props;
  return (
    <View style={styles.btn_view}>
      <TouchableOpacity style={styles.btn} onPress={onPressClose}>
        <Image source={AppImages.close_btn_img} style={styles.close_button} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  close_button: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  btn_view: {
    alignItems: 'flex-end',
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
});
