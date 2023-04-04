import { CommonParams } from 'types/theme';
import { StyleSheet } from 'react-native';

export default function <C>({
  Fonts,
  Colors,
  Gutters,
  Layout,
}: CommonParams<C>) {
  const outsideContainer = {
    backgroundColor: Colors.transparent,
  };

  const insideContainer = {
    ...Layout.fill,
    ...Gutters.tinyPadding,
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 0,
  };

  const title = {
    ...Fonts.titleSmall,
    ...Gutters.tinyTMargin,
    ...Gutters.tinyBMargin,
  };

  return StyleSheet.create({
    outsideContainer,
    insideContainer,
    title,
  });
}
