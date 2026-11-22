import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import BankAccount from '#models/BankAccount.ts';
import UserInquery from '#models/UserInquery.ts';
import { UserInqueryFactory } from '#domain/factories/UserInqueryFactory.ts';

export type AccountActivityWebServiceResponse = {
  message: string;
  data: {
    shebaId: string;
    accountActivity: number;
  }
};

class AccountActivityWorker {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.mockPath,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  private async executeAccountActivitiesWebService(shebaId: string): Promise<AccountActivityWebServiceResponse> {
    const response = await this.axiosInstance.get(`/accountActivities/${shebaId}`);

    return response.data;
  };

  private async getUserByNationalId(nationalId: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        nationalId
      },
      include: {
        bankAccounts: true
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  private async saveBankAccountActivity(id: string, amount: string): Promise<BankAccount> {
    const dataModel = await prisma.bankAccount.update({
      where: {
        id
      },
      data: {
        turnover: amount
      }
    });

    return dataModel && BankAccount.createFromSnapshot(dataModel);
  };

  private async createUserInqueryTurnover(userId: string, totalTurnover: number): Promise<UserInquery> {
    const userInqueryEntity = UserInqueryFactory.create({
      totalTurnover,
      userId
    });

    const dataModel = await prisma.userInquery.upsert({
      where: {
        userId
      },
      create: {
        id: userInqueryEntity.id,
        totalTurnover: userInqueryEntity.totalTurnover,
        userId: userInqueryEntity.userId
      },
      update: {
        totalTurnover: userInqueryEntity.totalTurnover
      }
    });

    return UserInquery.createFromSnapshot(dataModel);
  };

  public async geUserAccountActivity(nationalId: string) {
    // TODO: Need's to fix.
    const user = await this.getUserByNationalId(nationalId);

    if (!user)
      throw new Error(`User not found: ${nationalId}`);

    if (user.bankAccounts?.length === 0)
      throw new Error('No bankAccounts found for user');

    let totalTurnover: number = 0;

    const result = await Promise.all(
      user.bankAccounts?.map(async (bankAccount) => {
         const shebaId = bankAccount.shebaId;

         const userAccountActivity = await this.executeAccountActivitiesWebService(shebaId);

         totalTurnover+=userAccountActivity.data.accountActivity;

         const amount = String(userAccountActivity.data.accountActivity);

         return await this.saveBankAccountActivity(bankAccount.id, amount);
      })
    );

    await this.createUserInqueryTurnover(user.id, totalTurnover);

    return result;
  };
}

export async function AccountActivityWorkerProcessor(nationalId: string) {
  const activityWorker = new AccountActivityWorker();

  return await activityWorker.geUserAccountActivity(nationalId);
}