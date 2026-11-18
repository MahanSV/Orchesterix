import Ticket, { TicketAnswer } from '#models/Ticket.ts';


export interface TicketRepositoryInterface {
  findById(id: string): Promise<Ticket | null>;
  ticketAnswer(id: string, answer: TicketAnswer[]): Promise<Ticket>;
}