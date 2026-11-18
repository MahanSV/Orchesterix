import { TicketDTO } from '#application/dto/TicketDTO.ts';


export interface TicketServiceInterface {
  findById(id: string): Promise<TicketDTO>;
  ticketAnswer(id: string, answerDescription: string, staffId: string): Promise<TicketDTO>;
}