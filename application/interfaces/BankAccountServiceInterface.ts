import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';


export interface BankAccountServiceInterface {
  findById(id: string): Promise<BankAccountDTO>;
}