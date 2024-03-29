import { Platform } from 'react-native';
import { useMemo } from 'react';

type Props = {
  isIOS: boolean;
  isAndroid: boolean;
};

export default function usePlatform(): Props {
  const platform = useMemo(() => {
    switch (Platform.OS) {
      case 'ios':
        return 'ios';
      case 'android':
        return 'android';
      default:
        return null;
    }
  }, []);

  return {
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
  };
}
