/**
 * detectStringType detects for BankAccountFacility data types
 */
type StringType =
  | 'integer'
  | 'float'
  | 'negativeNumber'
  | 'percentage'
  | 'date'
  | 'datetime'
  | 'email'
  | 'mobile'
  | 'nationalCode'
  | 'empty'
  | 'text';

export function detectStringType(value: string): StringType {
  const input = value.trim();

  if (input === '') return 'empty';

  // Mobile
  if (/^09\d{9}$/.test(input)) return 'mobile';

  // National Code (Iran)
  if (/^\d{10}$/.test(input)) {
    const digits = input.split('').map(Number);
    const check = digits[9];

    const sum = digits
      .slice(0, 9)
      .reduce((total, digit, index) =>
        total + digit * (10 - index), 0);

    const remainder = sum % 11;

    if (
      (remainder < 2 && check === remainder) ||
      (remainder >= 2 && check === 11 - remainder)
    ) {
      return 'nationalCode';
    }
  }

  // Email
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
    return 'email';
  }

  // Date (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    const date = new Date(`${input}T00:00:00.000Z`);

    if (
      !isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === input
    ) {
      return 'date';
    }
  }

  // DateTime
  if (
    /^\d{4}-\d{2}-\d{2}T/.test(input) &&
    !isNaN(Date.parse(input))
  ) {
    return 'datetime';
  }

  // Percentage
  if (/^-?\d+(\.\d+)?%$/.test(input)) {
    return 'percentage';
  }

  // Negative Number
  if (/^-\d+(\.\d+)?$/.test(input)) {
    return 'negativeNumber';
  }

  // Integer
  if (/^\d+$/.test(input)) {
    return 'integer';
  }

  // Float / Decimal
  if (/^\d+\.\d+$/.test(input)) {
    return 'float';
  }

  return 'text';
}