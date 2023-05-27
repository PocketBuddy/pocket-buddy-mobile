import { capitalizeFirstLetter } from '@/utils';
import { LanguagesCodes } from 'types/components';

export default (date: Date, locale?: LanguagesCodes) =>
  [
    date.toLocaleString('default', { day: '2-digit' }),
    capitalizeFirstLetter(
      date.toLocaleString(locale || LanguagesCodes.English, { month: 'short' }),
    ),
    date.toLocaleString('default', { year: 'numeric' }),
  ].join(' ');
