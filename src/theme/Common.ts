/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { Button } from './components/';
import { CommonParams } from 'types/theme';

export default function <C>({ ...args }: CommonParams<C>) {
  return {
    button: Button({ ...args }),
  };
}
