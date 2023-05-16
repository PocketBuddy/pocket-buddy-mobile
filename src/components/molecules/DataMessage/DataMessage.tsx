import { Text, View } from 'react-native';
import ErrorSVG from '@/theme/assets/images/error.svg';
import NoDataSVG from '@/theme/assets/images/no-data.svg';
import React from 'react';
import { Spinner } from '@/components';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'error' | 'no-data' | 'loading';
};

export default function DataMessage({ type }: Props) {
  const { Layout, Colors, Gutters, Fonts } = useTheme();
  const { t } = useTranslation(['dataMessage']);

  return (
    <View
      style={[
        Layout.fill,
        Layout.center,
        Gutters.regularGap,
        { backgroundColor: Colors.background },
      ]}
    >
      {type === 'error' && (
        <>
          <ErrorSVG width={250} height={250} />
          <View style={[Layout.center, Gutters.tinyGap]}>
            <Text style={[Fonts.titleSmall]}>
              {t('dataMessage:error.header')}
            </Text>
            <Text style={[Fonts.textRegular]}>
              {t('dataMessage:error.message')}
            </Text>
          </View>
        </>
      )}
      {type === 'no-data' && (
        <>
          <NoDataSVG width={250} height={250} />
          <View style={[Layout.center, Gutters.tinyGap]}>
            <Text style={[Fonts.titleSmall]}>
              {t('dataMessage:noData.header')}
            </Text>
            <Text style={[Fonts.textRegular]}>
              {t('dataMessage:noData.message')}
            </Text>
          </View>
        </>
      )}
      {type === 'loading' && <Spinner />}
    </View>
  );
}
