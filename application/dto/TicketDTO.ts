import { TicketStatus } from '#domain/enums/ticket.ts';
import { UserDTO } from '#application/dto/UserDTO.ts';
import { StaffDTO } from '#application/dto/StaffDTO.ts';


export interface TicketDTO {
  id: string;
  description: string;
  attachment: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  userId: string;
  staffId: string;
  user: UserDTO;
  staff?: StaffDTO;
}