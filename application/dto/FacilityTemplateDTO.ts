import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';
import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';


export interface FacilityTemplateDTO {
  id: string
  value: string
  key: string
  order: number;
  createdAt: Date;
  updatedAt: Date;
  facilitiesCategoryId: string;
  facilitiesCategory?: FacilitiesCategoryDTO;
  facilityFields?: FacilityFieldDTO[];
}