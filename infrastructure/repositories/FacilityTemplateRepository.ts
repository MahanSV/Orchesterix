import { BaseRepository } from '#repositories/BaseRepository.ts';
import FacilityTemplate from '#models/FacilityTemplate.ts';
import { FacilityTemplateRepositoryInterface } from '#domain/interfaces/FacilityTemplateRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';

export class FacilityTemplateRepository extends BaseRepository<FacilityTemplate> implements FacilityTemplateRepositoryInterface {
  constructor() {
    super(FacilityTemplate.createFromSnapshot);
  };

  async findById(id: string): Promise<FacilityTemplate | null> {
    const dataModel = await prisma.facilityTemplate.findUnique({
      where: { id }
    });

    return dataModel && FacilityTemplate.createFromSnapshot(dataModel);
  };
}