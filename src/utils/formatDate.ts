import { capitalizeFirstLetter } from '@/utils';
import { LanguagesCodes } from 'types/components';

export default (date: Date | string, locale?: LanguagesCodes) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (isToday(date)) {
    return locale === LanguagesCodes.English ? 'Today' : 'Dzisiaj';
  }

  if (isYesterday(date)) {
    return locale === LanguagesCodes.English ? 'Yesterday' : 'Wczoraj';
  }

  return [
    date.toLocaleString('default', { day: '2-digit' }),
    capitalizeFirstLetter(
      date.toLocaleString(locale || LanguagesCodes.English, { month: 'short' }),
    ),
    date.toLocaleString('default', { year: 'numeric' }),
  ].join(' ');
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toDateString() === date.toDateString();
};
