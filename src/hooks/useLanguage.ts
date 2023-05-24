import { LanguagesCodes, LanguagesNames } from 'types/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { languageSelector } from '@/store/preferences/selectors';
import { setLanguage } from '@/store/preferences';

export default function useLanguage() {
  const currentLanguage = useSelector(languageSelector);
  const dispatch = useDispatch();
  const [newLabel, setNewLabel] = useState<LanguagesNames>(
    currentLanguage === LanguagesCodes.English
      ? LanguagesNames.Polish
      : LanguagesNames.English,
  );

  useEffect(() => {
    i18next.changeLanguage(currentLanguage);
    setNewLabel(
      currentLanguage === LanguagesCodes.English
        ? LanguagesNames.Polish
        : LanguagesNames.English,
    );
  }, [currentLanguage]);

  const handleChange = () => {
    const newLanguage =
      currentLanguage === LanguagesCodes.English
        ? LanguagesCodes.Polish
        : LanguagesCodes.English;
    dispatch(setLanguage(newLanguage));
  };

  return {
    newLabel,
    handleChange,
  };
}
