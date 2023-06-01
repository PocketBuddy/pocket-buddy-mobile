import React, { useMemo } from 'react';
import { decimalSeparatorSelector } from '@/store/preferences/selectors';
import { formatAmount } from '@/utils';
import { Paragraph } from '@/components';
import { useSelector } from 'react-redux';

type Props = {
  value: number;
  isBolded?: boolean;
};

export default function Amount({ value, isBolded = true }: Props) {
  const decimalSeparator = useSelector(decimalSeparatorSelector);

  // TODO: get currency based on budget
  const valueText = useMemo(
    () => formatAmount(value, decimalSeparator) + ' EUR',
    [value, decimalSeparator],
  );

  return <Paragraph text={valueText} bolded={isBolded} />;
}
