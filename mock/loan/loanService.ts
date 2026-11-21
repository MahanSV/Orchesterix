import {
  LOAN_TYPES,
  LOAN_STATUSES,
  LOAN_BANK_NAMES,
  LOAN_BORROWERS,
} from './Constants.ts';

export interface Loan {
  id: string;
  loanNumber: string;
  borrower: string;
  bankName: string;
  loanType: string;
  principal: number;
  interestRate: number;
  termMonths: number;
  monthlyInstallment: number;
  paidInstallments: number;
  remainingBalance: number;
  issueDate: Date;
  maturityDate: Date;
  status: string;
}

export class LoanMockService {
  private static randomItem<T>(items: readonly T[] | T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  };

  private static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private static randomAmount(min: number, max: number): number {
    return this.randomNumber(min, max);
  };

  private static randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() +
      Math.random() * (end.getTime() - start.getTime()),
    );
  };

  private static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  // محاسبه قسط ماهانه بر اساس نرخ سود و مدت وام
  private static calculateMonthlyInstallment(
    principal: number,
    annualInterestRate: number,
    termMonths: number,
  ): number {
    const monthlyRate = annualInterestRate / 100 / 12;

    if (monthlyRate === 0) {
      return Math.round(principal / termMonths);
    }

    const factor = Math.pow(1 + monthlyRate, termMonths);

    return Math.round(
      (principal * monthlyRate * factor) / (factor - 1),
    );
  };

  // محاسبه مانده بدهی بر اساس اقساط پرداخت‌شده
  private static calculateRemainingBalance(
    principal: number,
    annualInterestRate: number,
    termMonths: number,
    paidInstallments: number,
  ): number {
    if (paidInstallments >= termMonths) return 0;
    if (paidInstallments <= 0) return principal;

    const monthlyRate = annualInterestRate / 100 / 12;
    const installment = this.calculateMonthlyInstallment(
      principal,
      annualInterestRate,
      termMonths,
    );

    const factor = Math.pow(1 + monthlyRate, paidInstallments);

    return Math.max(
      0,
      Math.round(
        principal * factor -
        installment * ((factor - 1) / monthlyRate),
      ),
    );
  };

  public static generate(): Loan {
    const loanType = this.randomItem(LOAN_TYPES);

    const principal = this.randomAmount(
      loanType.minAmount,
      loanType.maxAmount,
    );

    const interestRate = this.randomNumber(
      loanType.minRate,
      loanType.maxRate,
    );

    const termMonths = this.randomNumber(
      loanType.minTerm,
      loanType.maxTerm,
    );

    const status = this.randomItem(LOAN_STATUSES);

    const now = new Date();

    let issueDate: Date;
    let paidInstallments: number;

    switch (status) {
      case 'PAID':
        // وام تسویه‌شده
        issueDate = this.randomDate(
          this.addMonths(now, -termMonths - 24),
          this.addMonths(now, -termMonths),
        );

        paidInstallments = termMonths;
        break;

      case 'PENDING':
        // وام در انتظار پرداخت
        issueDate = this.randomDate(
          now,
          this.addMonths(now, 3),
        );

        paidInstallments = 0;
        break;

      case 'DEFAULTED':
        // وام معوق و نکول‌شده
        issueDate = this.randomDate(
          this.addMonths(now, -termMonths),
          this.addMonths(now, -12),
        );

        paidInstallments = this.randomNumber(
          0,
          Math.max(0, termMonths - 1),
        );
        break;

      case 'OVERDUE':
        // وام دارای اقساط عقب‌افتاده
        issueDate = this.randomDate(
          this.addMonths(now, -termMonths),
          this.addMonths(now, -1),
        );

        paidInstallments = this.randomNumber(
          1,
          Math.max(1, termMonths - 1),
        );
        break;

      default:
        // وام فعال
        issueDate = this.randomDate(
          this.addMonths(now, -termMonths),
          now,
        );

        paidInstallments = this.randomNumber(
          0,
          Math.max(0, termMonths - 1),
        );
        break;
    }

    const maturityDate = this.addMonths(issueDate, termMonths);

    const monthlyInstallment = this.calculateMonthlyInstallment(
      principal,
      interestRate,
      termMonths,
    );

    const remainingBalance = this.calculateRemainingBalance(
      principal,
      interestRate,
      termMonths,
      paidInstallments,
    );

    return {
      id: crypto.randomUUID(),
      loanNumber: `LN-${Date.now()}-${this.randomNumber(1000, 9999)}`,
      borrower: this.randomItem(LOAN_BORROWERS),
      bankName: this.randomItem(LOAN_BANK_NAMES),
      loanType: loanType.name,
      principal,
      interestRate,
      termMonths,
      monthlyInstallment,
      paidInstallments,
      remainingBalance,
      issueDate,
      maturityDate,
      status,
    };
  };

  public static generateMany(): Loan[] {
    const randomNumber = Math.floor(Math.random() * 10) +1;

    const result: Loan[] = [];

    for (let i = 0; i <= randomNumber; i++) {
      result.push(this.generate());
    }

    return result;
  };
}