import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';
import { createFacilityCategoryCommand } from '#application/types/facilitiesCategory/command.ts';


export interface FacilitiesCategoryServiceInterface {
  findById(id: string): Promise<FacilitiesCategoryDTO>;
  createFacilityCategoryForSeed(command: createFacilityCategoryCommand): Promise<FacilitiesCategoryDTO>
}