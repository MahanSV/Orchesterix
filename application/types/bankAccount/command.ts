import { BankAccountStatus, bankAccountType } from '#domain/enums/bankAccount.ts';

export type createBankAccountCommand = {
  accountHolderName: string;
  shebaId: string;
  cardNumber: string;
  branchCode: string;
  branchName: string;
  turnover: string;
  type: bankAccountType;
  status: BankAccountStatus;
  score: string;
  userId: string;
};