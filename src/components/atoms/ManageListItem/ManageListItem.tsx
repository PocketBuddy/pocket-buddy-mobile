import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@/components';
import { IconType } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  title: string;
  isSubItem?: boolean;
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
};

const ICON_SIZE = 25;

export default function ManageListItem({
  title,
  isSubItem = false,
  handleAdd,
  handleEdit,
  handleDelete,
}: Props) {
  const { Layout, Gutters, Fonts, Images } = useTheme();

  return (
    <View
      style={[
        Layout.row,
        Layout.scrollSpaceBetween,
        Gutters.tinyPadding,
        Layout.alignItemsCenter,
      ]}
    >
      <Text style={[isSubItem ? Fonts.textRegular : Fonts.titleSmall]}>
        {title}
      </Text>
      <View style={[Layout.row, Gutters.tinyGap, Layout.rowCenter]}>
        {handleDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <Icon
              icon={Images.icons.delete}
              type={IconType.Primary}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        )}
        {handleEdit && (
          <TouchableOpacity onPress={handleEdit}>
            <Icon
              icon={Images.icons.edit}
              type={IconType.Primary}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        )}
        {handleAdd && (
          <TouchableOpacity onPress={handleAdd}>
            <Icon
              icon={Images.icons.add}
              type={IconType.Primary}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
