import React, { useMemo } from 'react';
import { decimalSeparatorSelector } from '@/store/preferences/selectors';
import { Paragraph } from '@/components';
import { useSelector } from 'react-redux';

type Props = {
  value: number;
  isBolded?: boolean;
};

const SEPARATORS = ['.', ','];

export default function Amount({ value, isBolded = true }: Props) {
  const decimalSeparator = useSelector(decimalSeparatorSelector);

  // TODO: get currency based on budget
  const valueText = useMemo(() => {
    const valueString = Number.parseFloat(value.toString()).toFixed(2);

    if (valueString.includes(SEPARATORS[0])) {
      const [integer, decimal] = valueString.split(SEPARATORS[0]);
      return `${integer}${decimalSeparator}${
        decimal.length === 1 ? `${decimal}0` : `${decimal}`
      } EUR`;
    }

    if (valueString.includes(SEPARATORS[1])) {
      const [integer, decimal] = valueString.split(SEPARATORS[1]);
      return `${integer}${decimalSeparator}${
        decimal.length === 1 ? `${decimal}0` : `${decimal}`
      } EUR`;
    }

    return `${valueString}${decimalSeparator}00 EUR`;
  }, [value, decimalSeparator]);

  return <Paragraph text={valueText} bolded={isBolded} />;
}
