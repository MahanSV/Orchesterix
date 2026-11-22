import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import UserInquery from '#models/UserInquery.ts';


export type GuaranteeWebServiceResponse = {
  message: string;
  data: {
    id: string;
    guaranteeNumber: string;
    type: string;
    bankName: string;
    beneficiary: string;
    applicant: string;
    amount: number,
    currency: string;
    issueDate: string;
    expiryDate: string;
    status: string;
    description: string;
  }[];
};

class GuaranteeWorker {
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

  private async executeGuaranteeWebService(nationalId: string): Promise<GuaranteeWebServiceResponse> {
    const response = await this.axiosInstance.get(`/guarantees`);

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

  private async updateUserInQueryGuarantee(id: string, updateData: GuaranteeWebServiceResponse['data'][number]): Promise<UserInquery> {
    const dataModel = await prisma.userInquery.update({
      where: {
        id
      },
      data: {
        guarantees: updateData
      }
    });

    return dataModel && UserInquery.createFromSnapshot(dataModel);
  };

  public async updateUserGuaranteeData(nationalId: string): Promise<UserInquery> {
    const user = await this.getUserByNationalId(nationalId);

    if (!user)
      throw new Error(`User not found: ${nationalId}`);

    const response = await this.executeGuaranteeWebService(nationalId);

    const guaranteeData = response.data;

    if (!user.userInqueries)
      throw new Error(`User doesn't have Inquiries to update: ${nationalId}`);

    const userInquery = await this.updateUserInQueryGuarantee(user.userInqueries.id, guaranteeData);

    if (!userInquery)
      throw new Error(`خطا در هنگام به روزرسانی استعلام کاربر.`);

    return userInquery;
  };
}

export async function guaranteeWorkerProcessor(nationalId: string) {
  const guaranteeWorker = new GuaranteeWorker();

  return await guaranteeWorker.updateUserGuaranteeData(nationalId);
}