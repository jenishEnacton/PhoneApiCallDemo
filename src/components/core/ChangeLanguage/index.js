import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';

export default function Change_Language(props) {
  const {value, onValueChange} = props;

  return (
    <View style={styles.switch_view}>
      <Text style={styles.lang_text}>En</Text>
      <Switch value={value} onValueChange={onValueChange} />
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
});
