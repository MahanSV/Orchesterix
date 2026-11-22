import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';


export interface FacilitiesCategoryServiceInterface {
  findById(id: string): Promise<BankAccountDTO>;
}