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

  async create(entity: FacilitiesCategory): Promise<FacilitiesCategory> {
    const dataModel = await prisma.facilitiesCategory.create({
      data: this.createSchemaFromFacilitiesCategory(entity),
    });

    return dataModel && FacilitiesCategory.createFromSnapshot(dataModel);
  };

  private createSchemaFromFacilitiesCategory(entity: FacilitiesCategory) {
    return {
      id: entity.id,
      name: entity.name,
      key: entity.key,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  };
}