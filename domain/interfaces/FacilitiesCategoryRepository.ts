import FacilitiesCategory from '#models/FacilitiesCategory.ts';


export interface FacilitiesCategoryRepositoryInterface {
  findById(id: string): Promise<FacilitiesCategory | null>;
}