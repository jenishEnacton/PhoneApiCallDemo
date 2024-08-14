import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/Theme/colors';
import config from '../../react-native-config';

export default function HomeImageCard(props) {
  const {item} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: item?.image_url ? item?.image_url : config.EMPTY_IMAGE_URL,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 180,
    resizeMode: 'contain',
  },
});
