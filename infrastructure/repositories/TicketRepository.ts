import { BaseRepository } from '#repositories/BaseRepository.ts';
import Ticket, { TicketAnswer } from '#models/Ticket.ts';
import { TicketRepositoryInterface } from '#domain/interfaces/TicketRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';


export default class TicketRepository extends BaseRepository<Ticket> implements TicketRepositoryInterface {
  constructor() {
    super(Ticket.createFromSnapshot);
  };

  async findById(id: string): Promise<Ticket | null> {
    const dataModel = await prisma.ticket.findUnique({
      where: {
        id
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };

  async ticketAnswer(id: string, answer: TicketAnswer[]): Promise<Ticket> {
    const dataModel = await prisma.ticket.update({
      where: {
        id
      },
      data: {
        answer: answer,
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };
}