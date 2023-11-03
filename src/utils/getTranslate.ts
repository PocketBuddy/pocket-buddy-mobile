import i18n from '@/translations';

// used for translate validation messages
export default function getTranslate(key?: any) {
  if (!key) {
    return undefined;
  }
  return i18n.t(key);
}
