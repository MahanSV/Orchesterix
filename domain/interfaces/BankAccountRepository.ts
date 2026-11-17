import BankAccount from '#models/BankAccount.ts';

export interface BankAccountRepositoryInterface {
  findById(id: string): Promise<BankAccount | null>;
}