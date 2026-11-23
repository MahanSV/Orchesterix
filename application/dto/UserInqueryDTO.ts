import { UserDTO } from '#application/dto/UserDTO.ts';
import { Guarantee, Loan } from '#models/UserInquery.ts';

export interface UserInqueryDTO {
  id: string;
  point?: string;
  guarantees?: Guarantee[];
  loans?: Loan[];
  totalTurnover: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: UserDTO;
}