import prisma from '#context/dbContext/prisma/client.ts';
import UserInquery from '#models/UserInquery.ts';
import { UserInqueryRepositoryInterface } from '#domain/interfaces/UserInqueryRepository.ts';
import { BaseRepository } from '#repositories/BaseRepository.ts';

export default class UserInqueryRepository extends BaseRepository<UserInquery> implements UserInqueryRepositoryInterface {
  constructor() {
    super(UserInquery.createFromSnapshot);
  };

  async findById(id: string): Promise<UserInquery | null> {
    const dataModel = await prisma.userInquery.findUnique({
      where: { id }
    });

    return dataModel && UserInquery.createFromSnapshot(dataModel);
  };
}