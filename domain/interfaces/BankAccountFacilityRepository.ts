import BankAccountFacility from '#models/BankAccountFacility.ts';

export interface BankAccountFacilityRepositoryInterface {
  findById(id: string): Promise<BankAccountFacility | null>;
}