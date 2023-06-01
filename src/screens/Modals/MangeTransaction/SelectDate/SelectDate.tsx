import { Paragraph, Title, TitleInteractive } from '@/components';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '@/utils';
import { languageSelector } from '@/store/preferences/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  setDate: (date: Date) => void;
  passedDate?: Date;
  modalTitle?: string;
};

export default function SelectDate({
  title,
  setDate,
  passedDate,
  modalTitle,
}: Props) {
  const { t } = useTranslation(['selectDate']);
  const [selectedDate, setSelectedDate] = useState<Date>(
    passedDate || new Date(),
  );
  const [open, setOpen] = useState(false);
  const language = useSelector(languageSelector);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <TitleInteractive
        renderTitle={() => (
          <>
            <Title text={title} size="Small" />
          </>
        )}
        renderButton={() => (
          <Paragraph
            text={formatDate(selectedDate, language)}
            onPress={() => setOpen(true)}
          />
        )}
      />
      <DatePicker
        modal
        open={open}
        date={selectedDate}
        title={modalTitle || null}
        mode="date"
        locale={language}
        confirmText={t('confirm')}
        cancelText={t('cancel')}
        onConfirm={newDate => {
          setOpen(false);
          setSelectedDate(newDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
