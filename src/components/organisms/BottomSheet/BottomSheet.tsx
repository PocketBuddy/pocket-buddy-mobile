import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@/hooks';

type Props = {
  title?: string;
  renderContent: () => React.ReactNode;
  breakpoints?: string[];
  isOpen: boolean;
  handleClose: () => void;
};

enum BottomSheetIndex {
  Closed = -1,
  Opened = 0,
}

export default function BottomSheet({
  title,
  renderContent,
  breakpoints = ['50%'],
  isOpen,
  handleClose,
}: Props) {
  const { Common } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => breakpoints, [breakpoints]);

  const handleOpen = () => {
    bottomSheetModalRef.current && isOpen
      ? bottomSheetModalRef.current?.present()
      : bottomSheetModalRef.current?.dismiss();
  };

  const handleSheetChanges = useCallback((index: number) => {
    // if bottom sheet has closed by gesture or backdrop press update modal visibility state
    index === BottomSheetIndex.Closed && handleClose();
  }, []);

  useEffect(() => {
    handleOpen();
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onChange={handleSheetChanges}
      containerStyle={Common.bottomSheet.outsideContainer}
      backgroundStyle={{
        backgroundColor: Common.bottomSheet.insideContainer.backgroundColor,
      }}
      style={Common.bottomSheet.insideContainer}
    >
      <View>
        {title && <Text style={Common.bottomSheet.title}>{title}</Text>}
        {renderContent()}
      </View>
    </BottomSheetModal>
  );
}
