export const LOAN_TYPES = [
  {
    name: 'PERSONAL',
    minAmount: 100_000_000,
    maxAmount: 2_000_000_000,
    minRate: 18,
    maxRate: 23,
    minTerm: 12,
    maxTerm: 60,
  },
  {
    name: 'HOME',
    minAmount: 1_000_000_000,
    maxAmount: 20_000_000_000,
    minRate: 18,
    maxRate: 23,
    minTerm: 60,
    maxTerm: 240,
  },
  {
    name: 'BUSINESS',
    minAmount: 500_000_000,
    maxAmount: 10_000_000_000,
    minRate: 18,
    maxRate: 24,
    minTerm: 12,
    maxTerm: 120,
  },
  {
    name: 'AUTO',
    minAmount: 300_000_000,
    maxAmount: 5_000_000_000,
    minRate: 18,
    maxRate: 23,
    minTerm: 12,
    maxTerm: 60,
  },
];

export const LOAN_STATUSES = [
  'ACTIVE',
  'PAID',
  'OVERDUE',
  'DEFAULTED',
  'PENDING',
] as const;

export const LOAN_BANK_NAMES = [
  'بانک ملی ایران',
  'بانک ملت',
  'بانک تجارت',
  'بانک سپه',
  'بانک صادرات ایران',
  'بانک پاسارگاد',
  'بانک پارسیان',
  'بانک سامان',
  'بانک شهر',
  'بانک اقتصاد نوین',
];

export const LOAN_BORROWERS = [
  'محمد رضایی',
  'علی محمدی',
  'حسین احمدی',
  'رضا کریمی',
  'مهدی حسینی',
  'امیر جعفری',
  'شرکت توسعه تجارت پارس',
  'شرکت صنایع آریا',
  'شرکت مهندسی سپهر',
  'شرکت بازرگانی نوین',
];