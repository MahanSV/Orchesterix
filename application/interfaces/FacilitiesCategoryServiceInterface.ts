import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';
import { createFacilityCategoryCommand } from '#application/types/facilitiesCategory/command.ts';


export interface FacilitiesCategoryServiceInterface {
  findById(id: string): Promise<FacilitiesCategoryDTO>;
  createFacilityCategory(command: createFacilityCategoryCommand): Promise<FacilitiesCategoryDTO>;
  getAllFacilitiesCategory(): Promise<FacilitiesCategoryDTO[]>;
}