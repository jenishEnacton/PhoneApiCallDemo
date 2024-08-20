import {Platform, I18nManager} from 'react-native';

const bold_fontFamily = Platform.OS === 'ios' ? 'circe-bold' : 'circeBold';

const regular_fontFamily =
  Platform.OS === 'ios' ? 'circe-regular' : 'circeSemiBold';

export const fontStyles = {
  html_view_txtStyles: {
    b: {
      direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      alignSelf: 'flex-start',
    },
    p: {
      alignSelf: 'flex-start',
      direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      textAlign: 'left',
      fontFamily: regular_fontFamily,
    },
    h1: {
      fontFamily: bold_fontFamily,
    },
    h2: {
      fontFamily: bold_fontFamily,
    },
    h3: {
      fontFamily: bold_fontFamily,
    },
    h4: {
      fontFamily: bold_fontFamily,
    },
    h5: {
      fontFamily: bold_fontFamily,
    },
    h6: {
      fontFamily: bold_fontFamily,
    },
  },
};
