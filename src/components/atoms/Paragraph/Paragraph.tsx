import { ParagraphAlign } from 'types/components';
import React from 'react';
import { Text } from 'react-native';
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
}: Props) {
  const { Common } = useTheme();
  const alignRight = align === ParagraphAlign.Right;
  const alignCenter = align === ParagraphAlign.Center;

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
