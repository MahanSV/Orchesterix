import { userStatus } from '#domain/enums/user.ts';
import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';
import { TicketDTO } from '#application/dto/TicketDTO.ts';
import { UserInqueryDTO } from '#application/dto/UserInqueryDTO.ts';

export interface UserDTO {
  id: string;
  name: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  status: userStatus;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  bankAccounts?: BankAccountDTO[];
  tickets?: TicketDTO[];
  userInqueries?: UserInqueryDTO;
}

export interface SimpleUserDTO {
    id: string;
    email: string;
    role: string;
}

export interface UserLoginDTO {
    token: string;
    userInfo: {
      id: string;
      name: string;
      lastName: string;
      nationalId: string;
      mobile: string;
    };
}