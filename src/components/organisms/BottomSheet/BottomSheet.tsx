import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/hooks';

type Props = {
  title?: string;
  renderContent: () => React.ReactNode;
  points?: string[];
  isOpen: boolean;
  handleClose: () => void;
};

enum BottomSheetIndex {
  Closed = -1,
  Opened = 0,
}

const DEFAULT_POINTS = ['50%'];

export default function BottomSheet({
  title,
  renderContent,
  points = DEFAULT_POINTS,
  isOpen,
  handleClose,
}: Props) {
  const { Common } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => points, [points]);

  const handleOpen = () => {
    bottomSheetModalRef.current && isOpen
      ? bottomSheetModalRef.current?.present()
      : bottomSheetModalRef.current?.dismiss();
  };

  const handleSheetChanges = useCallback((index: number) => {
    // if bottom sheet has closed by gesture or backdrop press update modal visibility state
    index === BottomSheetIndex.Closed && handleClose();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        animatedIndex={{ value: 1 }}
      />
    ),
    [],
  );

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
      backdropComponent={renderBackdrop}
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
