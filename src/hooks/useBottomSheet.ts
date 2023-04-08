import { useCallback, useState } from 'react';
import { Constants } from '@/utils';
import debounce from 'lodash.debounce';

type Props = {
  initialValue?: boolean;
  toggleSideEffects?: () => void;
  openSideEffects?: () => void;
  closeSideEffects?: () => void;
};

export default function useBottomSheet({
  initialValue = false,
  toggleSideEffects,
  openSideEffects,
  closeSideEffects,
}: Props) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(
    debounce(() => {
      toggleSideEffects?.();
      setIsOpen(prevValue => !prevValue);
    }, Constants.DEBOUNCE_TIMEOUT),
    [toggleSideEffects, setIsOpen],
  );

  const open = useCallback(
    debounce(() => {
      openSideEffects?.();
      setIsOpen(true);
    }, Constants.DEBOUNCE_TIMEOUT),
    [openSideEffects, setIsOpen],
  );

  const close = useCallback(
    debounce(() => {
      closeSideEffects?.();
      setIsOpen(false);
    }, Constants.DEBOUNCE_TIMEOUT),
    [closeSideEffects, setIsOpen],
  );

  return {
    isOpen,
    toggle,
    open,
    close,
  };
}
