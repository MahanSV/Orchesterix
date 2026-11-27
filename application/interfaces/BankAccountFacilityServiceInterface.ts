import { BankAccountFacilityDTO, BankAccountFacilityFilterDTO } from '#application/dto/BankAccountFacilityDTO.ts';
import {
  adminFilterQueryCommand,
  createBankAccountFacilityListCommand,
} from '#application/types/bankAccountFacility/command.ts';

export interface BankAccountFacilityServiceInterface {
  findById(id: string): Promise<BankAccountFacilityDTO>;
  getAllFilteredBankAccountFacilitiesForAdmin(query: adminFilterQueryCommand): Promise<BankAccountFacilityFilterDTO>;
  createBankAccountFacility(command: createBankAccountFacilityListCommand): Promise<BankAccountFacilityDTO[]>;
}