import {I18n} from 'i18n-js';
import en from './en.json';
import hi from './hi.json';

const i18n = new I18n({
  en: en,
  hi: hi,
});

export const trasnlate = val => {
  return i18n.t(val);
};

export default i18n;
