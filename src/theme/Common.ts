/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { BottomSheet, Button, Icon, Input, Paragraph } from './components/';
import { CommonParams } from 'types/theme';

export default function <C>({ ...args }: CommonParams<C>) {
  return {
    button: Button({ ...args }),
    icon: Icon({ ...args }),
    input: Input({ ...args }),
    paragraph: Paragraph({ ...args }),
    bottomSheet: BottomSheet({ ...args }),
  };
}
