import Ticket from '#models/Ticket.ts';


export interface TicketRepositoryInterface {
  findById(id: string): Promise<Ticket | null>;
}