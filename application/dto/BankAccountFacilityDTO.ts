import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';
import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';


export interface BankAccountFacilityDTO {
  id: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  bankAccountId: string;
  facilityFieldId: string;
  bankAccount?: BankAccountDTO;
  facilityField?: FacilityFieldDTO;
}

export interface BankAccountFacilityFilterDTO {
  bankAccountFacilities: BankAccountFacilityDTO[];
  total: number;
  page: number;
  totalPages: number;
}