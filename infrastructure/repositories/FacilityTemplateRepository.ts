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
      where: {
        id
      },
      include: {
        facilitiesCategory: true,
        facilityFields: true,
      }
    });

    return dataModel && FacilityTemplate.createFromSnapshot(dataModel);
  };

  async create(entity: FacilityTemplate): Promise<FacilityTemplate> {
    const dataModel = await prisma.facilityTemplate.create({
      data: this.createSchemaFromFacilityTemplate(entity),
    });

    return dataModel && FacilityTemplate.createFromSnapshot(dataModel);
  };

  createSchemaFromFacilityTemplate(entity: FacilityTemplate) {
    return {
      id: entity.id,
      value: entity.value,
      key: entity.key,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      facilitiesCategoryId: entity.facilitiesCategoryId,
    };
  };
}