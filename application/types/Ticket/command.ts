import { TicketStatus } from '#domain/enums/ticket.ts';

export type createTicketCommand = {
  title: string;
  description: string;
  attachment?: string;
  userId: string;
};

export type changeTitleAndDescriptionCommand = {
  id: string;
  title: string;
  description: string;
};


export type ticketFiltersQuery = {
  status?: TicketStatus;
  search?: string;
  page: number;
  limit: number;
  sortOrder: 'asc' | 'desc';
};

export type changeTicketStatusCommand = {
  id: string;
  status: TicketStatus;
};

export type staffClosingTicketCommand = {
  id: string;
  status: TicketStatus;
  closedAt: Date;
};