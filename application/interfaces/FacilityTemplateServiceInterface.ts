import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';


export interface FacilityTemplateServiceInterface {
  findById(id: string): Promise<FacilityTemplateDTO>;
}