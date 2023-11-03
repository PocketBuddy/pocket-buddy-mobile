import React, { useCallback, useEffect } from 'react';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '@/store/toast';
import { toastDataSelector } from '@/store/toast/selectors';
import { ToastMessage } from '@/components';
import { ToastType } from 'types/components';

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

export default function ToastHandler() {
  const dispatch = useDispatch();
  const { isOpen, header, message, type } = useSelector(toastDataSelector);

  const handleClose = useCallback(() => dispatch(hideToast()), []);

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

  return <Toast config={toastConfig} onHide={handleClose} topOffset={0} />;
}
