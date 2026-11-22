import axios, { AxiosInstance } from 'axios';
import env from '#substructure/env.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';

export type PointWebServiceResponse =  {
  message: string;
  data: number;
};

class PointWorker {
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

  private async executePointWebService(nationalId: string): Promise<PointWebServiceResponse> {
    const response = await this.axiosInstance.get(`/points`);

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

export async function PointWorkerProcessor(nationalId: string) {
  const pointWorker = new PointWorker();
}