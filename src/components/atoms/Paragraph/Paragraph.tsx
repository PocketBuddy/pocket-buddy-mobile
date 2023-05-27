import { Text, TouchableOpacity } from 'react-native';
import { ParagraphAlign } from 'types/components';
import React from 'react';
import { useTheme } from '@/hooks';

type Props = {
  text: string;
  isError?: boolean;
  bolded?: boolean;
  align?: ParagraphAlign;
  onPress?: () => void;
};

export default function Paragraph({
  text,
  isError = false,
  bolded = false,
  align = ParagraphAlign.Left,
  onPress,
}: Props) {
  const { Common } = useTheme();
  const alignRight = align === ParagraphAlign.Right;
  const alignCenter = align === ParagraphAlign.Center;

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            Common.paragraph.primary,
            isError && Common.paragraph.error,
            bolded && Common.paragraph.bolded,
            alignRight && Common.paragraph.right,
            alignCenter && Common.paragraph.center,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Text
      style={[
        Common.paragraph.primary,
        isError && Common.paragraph.error,
        bolded && Common.paragraph.bolded,
        alignRight && Common.paragraph.right,
        alignCenter && Common.paragraph.center,
      ]}
    >
      {text}
    </Text>
  );
}
