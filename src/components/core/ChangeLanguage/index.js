import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function Change_Language(props) {
  const {value, onValueChange, trackColor, thumbColor} = props;

  return (
    <View style={styles.switch_view}>
      <Text style={styles.lang_text}>En</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={trackColor}
        thumbColor={thumbColor}
      />
      <Text style={styles.lang_text}>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switch_view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-end',
  },
  lang_text: {
    color: COLORS.white,
  },
});
