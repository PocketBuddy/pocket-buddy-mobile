import React, { useCallback, useEffect, useMemo } from 'react';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '@/store/toast';
import { RootState } from '@/store';
import { ToastMessage } from '@/components';
import { ToastType } from 'types/components';
import { usePlatform } from '@/hooks';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <ToastMessage {...props} type={ToastType.Success} />
  ),
  info: (props: BaseToastProps) => (
    <ToastMessage {...props} type={ToastType.Info} />
  ),
  error: (props: BaseToastProps) => (
    <ToastMessage {...props} type={ToastType.Error} />
  ),
};

export default function ToastError() {
  const dispatch = useDispatch();
  const { isAndroid } = usePlatform();
  const isOpen = useSelector((state: RootState) => state.toast.isOpen);
  const header = useSelector((state: RootState) => state.toast.header);
  const message = useSelector((state: RootState) => state.toast.message);
  const type = useSelector((state: RootState) => state.toast.type);

  const handleClose = useCallback(() => dispatch(hide()), []);

  const topOffset = useMemo(() => (isAndroid ? 0 : undefined), [isAndroid]);

  useEffect(() => {
    if (!isOpen) {
      return Toast.hide();
    }
    Toast.show({
      type,
      text1: header,
      text2: message,
    });
  }, [isOpen, header, message, type]);

  return (
    <Toast config={toastConfig} onHide={handleClose} topOffset={topOffset} />
  );
}
