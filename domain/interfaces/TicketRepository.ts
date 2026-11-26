import Ticket, { TicketAnswer } from '#models/Ticket.ts';
import {
  changeTicketStatusCommand,
  changeTitleAndDescriptionCommand, staffClosingTicketCommand,
  ticketFiltersQuery,
} from '#application/types/Ticket/command.ts';


export interface TicketRepositoryInterface {
  findById(id: string): Promise<Ticket | null>;
  ticketAnswer(id: string, answer: TicketAnswer[]): Promise<Ticket>;
  changeTitleAndDescription(command: changeTitleAndDescriptionCommand): Promise<Ticket>;
  deleteTicket(id: string): Promise<Ticket>;
  getUserTickets(userId: string): Promise<Ticket[]>;
  getAllTicketsWithFilter(query: ticketFiltersQuery): Promise<{
    tickets: Ticket[],
    total: number,
    page: number,
    totalPages: number,
  }>;
  changeTicketStatus(command: changeTicketStatusCommand): Promise<Ticket>;
  staffClosingTicket(command: staffClosingTicketCommand): Promise<Ticket>;
  createTicketByUser(entity: Ticket): Promise<Ticket>
}