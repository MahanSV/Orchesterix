import { BaseRepository } from '#repositories/BaseRepository.ts';
import BankAccount from '#models/BankAccount.ts';
import { BankAccountRepositoryInterface } from '#domain/interfaces/BankAccountRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';

export default class BankAccountRepository extends BaseRepository<BankAccount> implements BankAccountRepositoryInterface {
  constructor() {
    super(BankAccount.createFromSnapshot);
  };

  async findById(id: string): Promise<BankAccount | null> {
    const dataModel = await  prisma.bankAccount.findUnique({
      where: { id }
    });

    return dataModel && BankAccount.createFromSnapshot(dataModel);
  };
}