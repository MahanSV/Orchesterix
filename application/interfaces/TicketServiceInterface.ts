import { TicketDTO } from '#application/dto/TicketDTO.ts';
import {
  changeTicketStatusCommand,
  changeTitleAndDescriptionCommand,
  ticketFiltersQuery,
} from '#application/types/Ticket/command.ts';


export interface TicketServiceInterface {
  findById(id: string): Promise<TicketDTO>;
  ticketAnswer(id: string, answerDescription: string, staffId: string): Promise<TicketDTO>;
  changeTitleAndDescription(command: changeTitleAndDescriptionCommand): Promise<TicketDTO>;
  deleteTicket(id: string): Promise<TicketDTO>;
  getUserTickets(userId: string): Promise<TicketDTO[]>;
  getAllTicketsWithFilter(query: ticketFiltersQuery): Promise<{
    tickets: TicketDTO[],
    total: number,
    page: number,
    totalPages: number,
  }>;
  changeTicketStatus(command: changeTicketStatusCommand): Promise<TicketDTO>;
  staffClosingTicket(id: string, staffId: string): Promise<TicketDTO>;
}