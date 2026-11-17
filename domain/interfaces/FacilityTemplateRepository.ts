import FacilityTemplate from '#models/FacilityTemplate.ts';


export interface FacilityTemplateRepositoryInterface {
  findById(id: string): Promise<FacilityTemplate | null>;
}