import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";

export default class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor() {
    super(User.createFromSnapshot);
  };


  async getAllUsers(): Promise<User[]> {
    const dataModels = await prisma.user.findMany({
      include: {
        bankAccounts: true,
        tickets: true,
        userInqueries: true,
      }
    });

    return dataModels.map(data => User.createFromSnapshot(data));
  }

  async getAllUsersWithInquiries(): Promise<User[]> {
    const dataModel = await prisma.user.findMany({
      where: {
        userInqueries: { isNot: null },
      },
      include: {
        userInqueries: true
      }
    });

    return dataModel.map(data => User.createFromSnapshot(data));
  };

  async getUserById(id: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        bankAccounts: true,
        tickets: true,
        userInqueries: true
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async checkUserExists(id: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async getUserWithUserInQuery(id: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        userInqueries: true
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  }

  async getUserByNationalIdAndMobile(nationalId: string, mobile: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        nationalId,
        mobile
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async getUserByMobile(mobile: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        mobile,
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };
  
  async createUser(entity: User): Promise<User> {
    const dataModel = await prisma.user.create({
      data: this.createSchemaFromUser(entity)
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async updateUser(entity: User): Promise<User> {
    const dataModel = await prisma.user.update({
      where: {
        id: entity.id,
      },
      data: this.createSchemaFromUser(entity)
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  createSchemaFromUser(entity: User) {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      nationalId: entity.nationalId,
      mobile: entity.mobile,
      status: entity.status,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  };
}
