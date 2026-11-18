import { TicketStatus } from '#domain/enums/ticket.ts';
import { UserDTO } from '#application/dto/UserDTO.ts';
import { StaffDTO } from '#application/dto/StaffDTO.ts';
import { TicketAnswer } from '#models/Ticket.ts';


export interface TicketDTO {
  id: string;
  title: string;
  description: string;
  attachment: string;
  answer?: TicketAnswer;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  userId: string;
  staffId?: string;
  user?: UserDTO;
  staff?: StaffDTO;
}