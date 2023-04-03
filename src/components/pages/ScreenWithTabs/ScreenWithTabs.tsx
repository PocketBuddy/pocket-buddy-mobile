import { Brand, HideKeyboard, Tabs } from '@/components';
import React from 'react';
import { TabScreens } from 'types/components';
import { useTheme } from '@/hooks';
import { View } from 'react-native';

type Props = {
  withBrand?: boolean;
  screens: TabScreens;
};

export default function ScreenWithTabs({ withBrand = false, screens }: Props) {
  const { Gutters, Layout, Colors } = useTheme();

  return (
    <HideKeyboard>
      <View
        style={[
          { backgroundColor: Colors.background },
          Layout.fill,
          Layout.col,
          Gutters.smallPadding,
          Gutters.regularRowGap,
        ]}
      >
        {withBrand && (
          <View style={[Layout.alignItemsCenter]}>
            <Brand />
          </View>
        )}
        <Tabs screens={screens} />
      </View>
    </HideKeyboard>
  );
}
