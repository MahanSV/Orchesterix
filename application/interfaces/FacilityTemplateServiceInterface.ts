import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';
import { createFacilityTemplateCommand } from '#application/types/facilityTemplate/command.ts';


export interface FacilityTemplateServiceInterface {
  findById(id: string): Promise<FacilityTemplateDTO>;
  create(command: createFacilityTemplateCommand): Promise<FacilityTemplateDTO>;
}