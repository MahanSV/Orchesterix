import { UserDTO } from '#application/dto/UserDTO.ts';
import { BankAccountFacilityDTO } from '#application/dto/BankAccountFacilityDTO.ts';
import { BankAccountStatus, bankAccountType } from '#domain/enums/bankAccount.ts';


export interface BankAccountDTO {
  id: string;
  accountHolderName: string;
  shebaId: string;
  cardNumber: string;
  branchCode: string;
  branchName: string;
  turnover: string;
  type: bankAccountType;
  status: BankAccountStatus;
  score: string;
  userId: string;
  user?: UserDTO;
  bankAccountFacilities?: BankAccountFacilityDTO[];
}