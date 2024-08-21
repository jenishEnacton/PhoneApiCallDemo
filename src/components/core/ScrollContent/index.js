import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/Theme/colors';

export default function ScrollContent(props) {
  const {style, children} = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      {...props}
      style={[styles.container, style]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
