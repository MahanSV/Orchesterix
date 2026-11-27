import BankAccountFacility from '#models/BankAccountFacility.ts';
import { adminFilterQueryCommand } from '#application/types/bankAccountFacility/command.ts';

export interface BankAccountFacilityRepositoryInterface {
  findById(id: string): Promise<BankAccountFacility | null>;
  getAllFilteredBankAccountFacilitiesForAdmin(query: adminFilterQueryCommand): Promise<{
    bankAccountFacilities: BankAccountFacility[],
    total: number,
    page: number,
    totalPages: number,
  }>;
}