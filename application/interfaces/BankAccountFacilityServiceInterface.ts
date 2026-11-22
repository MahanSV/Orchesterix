import { BankAccountFacilityDTO } from '#application/dto/BankAccountFacilityDTO.ts';


export interface BankAccountFacilityServiceInterface {
  findById(id: string): Promise<BankAccountFacilityDTO>;
}