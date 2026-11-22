import { BaseRepository } from '#repositories/BaseRepository.ts';
import { FacilityFieldRepositoryInterface } from '#domain/interfaces/FacilityFieldRepository.ts';
import FacilityField from '#models/FacilityField.ts';
import prisma from '#context/dbContext/prisma/client.ts';

export class FacilityFieldRepository extends BaseRepository<FacilityField> implements FacilityFieldRepositoryInterface {
  constructor() {
    super(FacilityField.createFromSnapshot);
  };

  async findById(id: string): Promise<FacilityField | null> {
    const dataModel = await prisma.facilityField.findUnique({
      where: {
        id
      }
    });

    return dataModel && FacilityField.createFromSnapshot(dataModel);
  };
}