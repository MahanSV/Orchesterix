import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';

export interface FacilitiesCategoryDTO {
  id: string;
  name: string;
  key: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  facilityTemplates?: FacilityTemplateDTO[];
}