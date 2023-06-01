const SEPARATORS = ['.', ','];

export default (amount: string | number, decimalSeparator: string) => {
  const valueString = Number.parseFloat(amount.toString()).toFixed(2);

  if (valueString.includes(SEPARATORS[0])) {
    const [integer, decimal] = valueString.split(SEPARATORS[0]);
    return `${integer}${decimalSeparator}${
      decimal.length === 1 ? `${decimal}0` : `${decimal}`
    }`;
  }

  if (valueString.includes(SEPARATORS[1])) {
    const [integer, decimal] = valueString.split(SEPARATORS[1]);
    return `${integer}${decimalSeparator}${
      decimal.length === 1 ? `${decimal}0` : `${decimal}`
    }`;
  }

  return `${valueString}${decimalSeparator}00`;
};
