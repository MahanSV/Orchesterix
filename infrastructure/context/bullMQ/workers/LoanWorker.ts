import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import { Loan } from '#models/UserInquery.ts';


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
}

export async function loanWorkerProcessor(nationalId: string) {
  const loanWorker = new LoanWorker();
}