import axios from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import { BankAccountFactory } from '#domain/factories/BankAccountFactory.ts';
import { BankAccountStatus, bankAccountType } from '#domain/enums/bankAccount.ts';
import { createBankAccountCommand } from '#application/types/bankAccount/command.ts';
import BankAccount from '#models/BankAccount.ts';

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

  async getBankAccounts(): Promise<BankAccountWebServiceData[]> {
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

  async saveBankAccountData(userId: string): Promise<BankAccount[]> {
    const data = await this.getBankAccounts();

    console.log("Parameter: ", userId);

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
        score: bankAccount.score,
        userId: userId,
      };

      console.log("Command: ", command);

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
        userId: userId,
      };
    });

    const dataModel = await prisma.bankAccount.createMany({
      data: bankAccountEntities,
    });

    return dataModel && BankAccount.createFromSnapshot(dataModel);
  };
}

export async function bankAccountWorkerProcessor(userId: string): Promise<BankAccount[]> {
  const bankAccountWorker = new BankAccountsWorker();

  return await bankAccountWorker.saveBankAccountData(userId);
}