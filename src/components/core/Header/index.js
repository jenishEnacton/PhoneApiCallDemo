import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import Icons from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation();
  const {title, isBack} = props;
  return (
    <View style={isBack ? styles.header_view : styles.header_view_noisback}>
      {isBack && (
        <Icons.AntDesign
          name="left"
          style={styles.back_icon}
          onPress={() => navigation.goBack()}
        />
      )}
      <Text style={isBack ? styles.title : styles.no_backtitle}>{title}</Text>
      <View style={styles.empty_view} />
    </View>
  );
}

const styles = StyleSheet.create({
  header_view: {
    height: 50,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  header_view_noisback: {
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  title: {
    color: COLORS.light_primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  no_backtitle: {
    color: COLORS.light_primary,
    fontSize: 20,
    marginLeft: 18,
    fontWeight: 'bold',
  },
  back_icon: {
    fontSize: 23,
    color: COLORS.white,
  },
  empty_view: {
    height: 23,
    width: 23,
  },
});
