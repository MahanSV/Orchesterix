import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';
import { BankAccountFacilityDTO } from '#application/dto/BankAccountFacilityDTO.ts';

export interface FacilityFieldDTO {
  id: string;
  value: string;
  facilityTemplateId: string;
  facilityTemplate?: FacilityTemplateDTO;
  bankAccountFacilities?: BankAccountFacilityDTO[];
}