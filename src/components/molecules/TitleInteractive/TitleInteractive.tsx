import React from 'react';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  renderTitle: () => JSX.Element;
  renderButton: () => JSX.Element;
};

export default function TitleInteractive({ renderTitle, renderButton }: Props) {
  const { Layout } = useTheme();

  return (
    <View
      style={[Layout.row, Layout.scrollSpaceBetween, Layout.alignItemsCenter]}
    >
      {renderTitle()}
      {renderButton()}
    </View>
  );
}
