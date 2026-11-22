import { BaseRepository } from '#repositories/BaseRepository.ts';
import { FacilitiesCategoryRepositoryInterface } from '#domain/interfaces/FacilitiesCategoryRepository.ts';
import FacilitiesCategory from '#models/FacilitiesCategory.ts';
import prisma from '#context/dbContext/prisma/client.ts';

export class FacilitiesCategoryRepository extends BaseRepository<FacilitiesCategory> implements FacilitiesCategoryRepositoryInterface {
  constructor() {
    super(FacilitiesCategory.createFromSnapshot);
  };

  async findById(id: string): Promise<FacilitiesCategory | null> {
    const dataModel = await prisma.facilitiesCategory.findUnique({
      where: { id }
    });

    return dataModel && FacilitiesCategory.createFromSnapshot(dataModel);
  };
}