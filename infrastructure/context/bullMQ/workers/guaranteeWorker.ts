import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import UserInquery, { Guarantee } from '#models/UserInquery.ts';
import { UserInqueryFactory } from '#domain/factories/UserInqueryFactory.ts';


export type GuaranteeWebServiceResponse = {
  message: string;
  data: Guarantee[];
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

  private async addOrUpdateUserInQueryGuarantee(updateData: GuaranteeWebServiceResponse['data'], userId: string, id?: string): Promise<UserInquery> {
    // Update
    if (id) {
      const dataModel = await prisma.userInquery.update({
        where: {
          id
        },
        data: {
          guarantees: updateData
        }
      });

      return dataModel && UserInquery.createFromSnapshot(dataModel);
    }

    // Create
    const userInqueryEntity = UserInqueryFactory.create({
      userId: userId
    });

    const dataModel = await prisma.userInquery.create({
      data: {
        id: userInqueryEntity.id,
        guarantees: userInqueryEntity.guarantees,
        userId: userInqueryEntity.userId,
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

    const userInquery = await this.addOrUpdateUserInQueryGuarantee(
      guaranteeData,
      user.id,
      user?.userInqueries?.id
    );

    if (!userInquery)
      throw new Error(`خطا در هنگام به روزرسانی استعلام کاربر.`);

    return userInquery;
  };
}

export async function guaranteeWorkerProcessor(nationalId: string): Promise<UserInquery> {
  const guaranteeWorker = new GuaranteeWorker();

  return await guaranteeWorker.updateUserGuaranteeData(nationalId);
}