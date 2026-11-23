import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import UserInquery, { Loan } from '#models/UserInquery.ts';
import { UserInqueryFactory } from '#domain/factories/UserInqueryFactory.ts';


export type LoanWorkerWebServiceResponse = {
  message: string;
  data: Loan[];
};

class LoanWorker {
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

  private async executeLoanWebService(nationalId: string): Promise<LoanWorkerWebServiceResponse> {
    const response = await this.axiosInstance.get(`/loans`);

    return response.data;
  };

  private async getUserByNationalId(nationalId: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        nationalId
      },
      include: {
        userInqueries: true
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  private async addOrUpdateUserInQueryLoan(updateData: LoanWorkerWebServiceResponse['data'], userId: string, id?: string): Promise<UserInquery> {
    // Update
    if (id) {
      const dataModel = await prisma.userInquery.update({
        where: {
          id
        },
        data: {
          loans: updateData
        }
      });

      return dataModel && UserInquery.createFromSnapshot(dataModel);
    }

    // Create
    const userInqueryEntity = UserInqueryFactory.create({
      userId: userId,
      loans: updateData
    });

    const dataModel = await prisma.userInquery.create({
      data: {
        id: userInqueryEntity.id,
        loans: userInqueryEntity.loans,
        userId: userInqueryEntity.userId,
      }
    });

    return dataModel && UserInquery.createFromSnapshot(dataModel);
  };

  public async saveLoanDataForUserInquery(nationalId: string): Promise<UserInquery> {
    const user = await this.getUserByNationalId(nationalId);

    if (!user)
      throw new Error(`User not found: ${nationalId}`);

    const webServiceData = await this.executeLoanWebService(nationalId);

    const updateData = webServiceData.data;

    const userInquery = await this.addOrUpdateUserInQueryLoan(updateData, user.id, user?.userInqueries?.id);

    if (!userInquery)
      throw new Error('خطا در هنگام به روزرسانی استعلام وام های کاربر.');

    return userInquery;
  };
}

export async function loanWorkerProcessor(nationalId: string): Promise<UserInquery> {
  const loanWorker = new LoanWorker();

  return await loanWorker.saveLoanDataForUserInquery(nationalId);
}