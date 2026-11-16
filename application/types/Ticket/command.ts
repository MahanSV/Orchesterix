import { TicketStatus } from '#domain/enums/ticket.ts';

export type createTicketCommand = {
  description: string;
  attachment: string;
  status: TicketStatus;
  closedAt?: Date;
  userId: string;
  staffId?: string;
};