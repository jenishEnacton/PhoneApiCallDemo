import React, {forwardRef} from 'react';
import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../assets/Theme/colors';

const windowHeight = Dimensions.get('window').height;

const BottomModal = forwardRef((props, ref) => {
  const {close_modal, visible_modal, children, view_style} = props;

  return (
    <Modal
      ref={ref}
      transparent={true}
      animationType="fade"
      onRequestClose={close_modal}
      visible={visible_modal}>
      <View style={styles.modalBackground}>
        <View style={[styles.modal_data, view_style]}>{children}</View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
  },
  modal_data: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: COLORS.white,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 20,
    minHeight: windowHeight * 0.4,
    maxHeight: windowHeight - 100,
    paddingTop: 20,
  },
});

export default BottomModal;
