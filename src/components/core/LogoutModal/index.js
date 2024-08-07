import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../../../assets/Theme/colors';
import CButton from '../CButton';
import {AppImages} from '../../../assets/images';
const windowWidth = Dimensions.get('window').width;

export const LogoutModal = props => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={props.onRequestClose}
      visible={props.visible}>
      <TouchableOpacity
        onPress={props.onRequestClose}
        style={styles.modalContainer}>
        <View style={styles.confirmContainer}>
          <Text style={styles.title}>{'Are you sure you want to Logout'}</Text>
          <Image source={AppImages.log_out} style={styles.image} />
          <CButton
            extrasty={styles.btn}
            title={'Log Out'}
            onPress={props.onPressLogout}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    width: '90%',
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.dark,
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: '#0003',
    alignSelf: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  confirmContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: windowWidth - 90,
    marginHorizontal: 15,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  btn: {
    width: '50%',
    marginVertical: 0,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
