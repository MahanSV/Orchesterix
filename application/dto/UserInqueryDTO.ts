import { UserDTO } from '#application/dto/UserDTO.ts';


export interface UserInqueryDTO {
  id: string;
  point?: string;
  guarantees?: any;
  totalTurnover: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: UserDTO;
}