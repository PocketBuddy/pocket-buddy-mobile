import { showToast } from '@/store/toast';
import { ToastType } from 'types/components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';

export default function useNetworkError() {
  const { t } = useTranslation(['toast']);
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected || isConnected === null) {
      return;
    }
    dispatch(
      showToast({
        header: t('toast:connectionError.header'),
        message: t('toast:connectionError.message'),
        type: ToastType.Info,
      }),
    );
  }, [isConnected]);

  return {
    isNetworkError: !isConnected,
  };
}
