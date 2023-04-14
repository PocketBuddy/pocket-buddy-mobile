import {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from 'react-native-toast-message';
import React from 'react';
import { ToastType } from 'types/components';
import { useTheme } from '@/hooks';

type Props = BaseToastProps & {
  type: ToastType;
};

export default function ToastErrorMessage({ type, ...props }: Props) {
  const { Colors, Gutters, Fonts } = useTheme();

  switch (type) {
    case ToastType.Success:
      return (
        <SuccessToast
          {...props}
          style={[{ borderLeftColor: Colors.success }, Gutters.smallTMargin]}
          text1Style={[Fonts.titleSmall, Fonts.textSuccess]}
          text2Style={[Fonts.textSmall]}
        />
      );
    case ToastType.Info:
      return (
        <InfoToast
          {...props}
          style={[{ borderLeftColor: Colors.primary }, Gutters.smallTMargin]}
          text1Style={[Fonts.titleSmall]}
          text2Style={[Fonts.textSmall]}
        />
      );
    case ToastType.Error:
      return (
        <ErrorToast
          {...props}
          style={[{ borderLeftColor: Colors.error }, Gutters.smallTMargin]}
          text1Style={[Fonts.titleSmall, Fonts.textError]}
          text2Style={[Fonts.textSmall]}
        />
      );
    default:
      return null;
  }
}
