import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';


export interface FacilitiesCategoryServiceInterface {
  findById(id: string): Promise<FacilitiesCategoryDTO>;
}