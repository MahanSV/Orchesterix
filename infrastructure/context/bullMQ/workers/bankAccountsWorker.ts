import axios from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import { BankAccountFactory } from '#domain/factories/BankAccountFactory.ts';
import { BankAccountStatus, bankAccountType } from '#domain/enums/bankAccount.ts';
import { createBankAccountCommand } from '#application/types/bankAccount/command.ts';
import BankAccount from '#models/BankAccount.ts';
import User from '#models/User.ts';

type BankAccountWebServiceData = {
  fullName: string;
  sheba: string;
  cardNumber: string;
  branchCode: string;
  branchName: string;
  turnover: string;
  score: number;
  type: string;
  status: string;
};

class BankAccountsWorker {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.mockPath,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  async getBankAccounts(): Promise<{ message: string, data: BankAccountWebServiceData[] }> {
    const response = await this.axiosInstance.get('/banAccounts');

    return response.data;
  };

  statusValidation(statusValue: string): BankAccountStatus {
    const validStatusLists = Object.values(BankAccountStatus);

    if (!validStatusLists.includes(statusValue as BankAccountStatus))
      throw Error(`BankAccountStatus: ${statusValue}`);

    return statusValue as BankAccountStatus;
  };

  typeValidation(typeValue: string): bankAccountType {
    const validTypeLists = Object.values(bankAccountType);

    if (!validTypeLists.includes(typeValue as bankAccountType))
      throw Error(`BankAccountType: ${typeValue}`);

    return typeValue as bankAccountType;
  };

  async getUserByNationalId(nationalId: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        nationalId
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async saveBankAccountData(nationalId: string): Promise<BankAccount[]> {
    const user = await this.getUserByNationalId(nationalId);

    if (!user)
      throw Error(`User not found: ${nationalId}`);

    const data = await this.getBankAccounts();

    const bankAccountEntities = data?.data?.map(bankAccount => {
      const command: createBankAccountCommand = {
        accountHolderName: bankAccount.fullName,
        shebaId: bankAccount.sheba,
        cardNumber: bankAccount.cardNumber,
        branchCode: bankAccount.branchCode,
        branchName: bankAccount.branchName,
        turnover: bankAccount.turnover,
        type: this.typeValidation(bankAccount.type),
        status: this.statusValidation(bankAccount.status),
        score: String(bankAccount.score),
        userId: user.id,
      };

      const bankAccountEntity = BankAccountFactory.create(command);

      return {
        id: bankAccountEntity.id,
        accountHolderName: bankAccountEntity.accountHolderName,
        shebaId: bankAccountEntity.shebaId,
        cardNumber: bankAccountEntity.cardNumber,
        branchCode: bankAccountEntity.branchCode,
        branchName: bankAccountEntity.branchName,
        turnover: bankAccountEntity.turnover,
        type: bankAccountEntity.type,
        status: bankAccountEntity.status,
        score: String(bankAccountEntity.score),
        userId: user.id,
      };
    });

    const dataModel = await prisma.bankAccount.createManyAndReturn({
      data: bankAccountEntities,
    });

    return dataModel.map(data => BankAccount.createFromSnapshot(data));
  };
}

export async function bankAccountWorkerProcessor(nationalId: string): Promise<BankAccount[]> {
  const bankAccountWorker = new BankAccountsWorker();

  return await bankAccountWorker.saveBankAccountData(nationalId);
}