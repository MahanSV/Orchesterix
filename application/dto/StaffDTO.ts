import { StaffRole, StaffStatus } from '#domain/enums/staff.ts';
import { TicketDTO } from '#application/dto/TicketDTO.ts';

export interface StaffDTO {
  id: string;
  name: string;
  lastName: string;
  nationalId: string;
  role: StaffRole;
  status: StaffStatus;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  ticket?: TicketDTO;
}

export interface StaffLoginDTO {
  token: string;
  userInfo: {
    id: string;
    name: string;
    lastName: string;
    nationalId: string;
    role: StaffRole;
  };
}