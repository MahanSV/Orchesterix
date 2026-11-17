import { BaseRepository } from '#repositories/BaseRepository.ts';
import BankAccountFacility from '#models/BankAccountFacility.ts';
import { BankAccountFacilityRepositoryInterface } from '#domain/interfaces/BankAccountFacilityRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';


export default class BankAccountFacilityRepository extends BaseRepository<BankAccountFacility> implements BankAccountFacilityRepositoryInterface {
  constructor() {
    super(BankAccountFacility.createFromSnapshot);
  };

  async findById(id: string): Promise<BankAccountFacility | null> {
    const dataModel = await prisma.bankAccountFacility.findUnique({
      where: { id },
    });

    return dataModel && BankAccountFacility.createFromSnapshot(dataModel);
  };
}