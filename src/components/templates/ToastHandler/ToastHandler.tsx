import React, { useCallback, useEffect, useMemo } from 'react';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '@/store/toast';
import { RootState } from '@/store';
import { ToastMessage } from '@/components';
import { useTranslation } from 'react-i18next';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <ToastMessage {...props} type="success" />
  ),
  info: (props: BaseToastProps) => <ToastMessage {...props} type="info" />,
  error: (props: BaseToastProps) => <ToastMessage {...props} type="error" />,
};

export default function ToastError() {
  const { t } = useTranslation(['toast']);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.toast.isOpen);
  const header = useSelector((state: RootState) => state.toast.header);
  const success = useSelector((state: RootState) => state.toast.success);
  const info = useSelector((state: RootState) => state.toast.info);
  const error = useSelector((state: RootState) => state.toast.error);

  const errorMessage = useMemo(
    () => error || t('toast:error.message'),
    [error],
  );
  const successMessage = useMemo(() => success || '', [success]);
  const infoMessage = useMemo(() => info || '', [info]);

  const toastType = useMemo(
    () => (info ? 'info' : success ? 'success' : 'error'),
    [info, success],
  );

  const toastHeader = useMemo(() => {
    switch (toastType) {
      case 'error':
        return header || t('toast:error.header');
      default:
        return header || '';
    }
  }, [toastType, header]);

  const toastMessage = useMemo(
    () => (info ? infoMessage : success ? successMessage : errorMessage),
    [errorMessage, successMessage, infoMessage],
  );

  const handleClose = useCallback(() => dispatch(hide()), []);

  useEffect(() => {
    if (!isOpen) {
      return Toast.hide();
    }
    Toast.show({
      type: toastType,
      text1: toastHeader,
      text2: toastMessage,
    });
  }, [isOpen, error]);

  return <Toast config={toastConfig} onHide={handleClose} />;
}
