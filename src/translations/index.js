import {I18n} from 'i18n-js';
import en from './en.json';
import hi from './hi.json';

const i18n = new I18n({
  en: en,
  hi: hi,
});

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
