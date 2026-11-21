import { APPLICANTS, BANK_GUARANTEE_STATUSES, BANK_GUARANTEE_TYPES, BANK_NAMES, BENEFICIARIES } from './Constants.ts';

export interface BankGuarantee {
  id: string;
  guaranteeNumber: string;
  type: string;
  bankName: string;
  beneficiary: string;
  applicant: string;
  amount: number;
  currency: string;
  issueDate: Date;
  expiryDate: Date;
  status: string;
  description: string;
}

export class BankGuaranteeService {
  private static randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  private static randomAmount(): number {
    const min = 100_000_000;
    const max = 50_000_000_000;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() +
      Math.random() * (end.getTime() - start.getTime()),
    );
  }

  public static generate(): BankGuarantee {
    const issueDate = this.randomDate(
      new Date('2024-01-01'),
      new Date('2026-11-21'),
    );

    const expiryDate = new Date(issueDate);
    expiryDate.setMonth(expiryDate.getMonth() + 3 + Math.floor(Math.random() * 12));

    return {
      id: crypto.randomUUID(),
      guaranteeNumber: `BG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: this.randomItem(BANK_GUARANTEE_TYPES),
      bankName: this.randomItem(BANK_NAMES),
      beneficiary: this.randomItem(BENEFICIARIES),
      applicant: this.randomItem(APPLICANTS),
      amount: this.randomAmount(),
      currency: 'IRR',
      issueDate,
      expiryDate,
      status: this.randomItem(BANK_GUARANTEE_STATUSES),
      description: 'ضمان‌نامه بانکی صادر شده بابت تعهدات قراردادی',
    };
  }

  public static generateMany(): BankGuarantee[] {
    const randomNumber = Math.floor(Math.random() * 10) +1;

    const result: BankGuarantee[] = [];

    for (let i = 0; i < randomNumber; i++) {
      result.push(this.generate());
    }

    return result;
  };
}