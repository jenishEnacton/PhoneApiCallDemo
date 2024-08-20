import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';
import Icons from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation();
  const {title, isBack, component} = props;
  return (
    <View style={styles.header_view}>
      {isBack ? (
        <Icons.AntDesign
          name="left"
          style={styles.back_icon}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <View style={styles.is_backnot} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.empty_view}>{component}</View>
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
  },
  title: {
    color: COLORS.light_primary,
    fontSize: 20,
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
  is_backnot: {
    height: 23,
    width: 23,
  },
});
