import { TicketStatus } from '#domain/enums/ticket.ts';

export type createTicketCommand = {
  title: string;
  description: string;
  attachment: string;
  userId: string;
};