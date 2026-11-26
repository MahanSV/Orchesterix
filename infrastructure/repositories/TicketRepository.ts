import { BaseRepository } from '#repositories/BaseRepository.ts';
import Ticket, { TicketAnswer } from '#models/Ticket.ts';
import { TicketRepositoryInterface } from '#domain/interfaces/TicketRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import {
  changeTicketStatusCommand,
  changeTitleAndDescriptionCommand, staffClosingTicketCommand,
  ticketFiltersQuery,
} from '#application/types/Ticket/command.ts';


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

  async changeTitleAndDescription(command: changeTitleAndDescriptionCommand): Promise<Ticket> {
    const dataModel = await prisma.ticket.update({
      where: {
        id: command.id,
      },
      data: {
        title: command.title,
        description: command.description,
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };

  async deleteTicket(id: string): Promise<Ticket> {
    const dataModel = await prisma.ticket.delete({
      where: {
        id
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };

  async getUserTickets(userId: string): Promise<Ticket[]> {
    const dataModels = await prisma.ticket.findMany({
      where: {
        userId
      }
    });

    return dataModels.map(data => Ticket.createFromSnapshot(data));
  };

  async getAllTicketsWithFilter(query: ticketFiltersQuery): Promise<{
    tickets: Ticket[],
    total: number,
    page: number,
    totalPages: number,
  }>
  {
    const where: any = {};

    if (query?.status) where.status = query.status;

    if (query?.search) {
      where.OR = [
        { title: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    const [dataModels, total] = await Promise.all([
      await prisma.ticket.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: {
          createdAt: query.sortOrder
        },
      }),

      await prisma.ticket.count({ where })
    ]);

    return {
      tickets: dataModels.map(data => Ticket.createFromSnapshot(data)),
      total,
      page: query.page,
      totalPages: Math.ceil(total / query.limit)
    }
  };

  async changeTicketStatus(command: changeTicketStatusCommand): Promise<Ticket> {
    const dataModel = await prisma.ticket.update({
      where: {
        id: command.id,
      },
      data: {
        status: command.status,
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };

  async staffClosingTicket(command: staffClosingTicketCommand): Promise<Ticket> {
    const dataModel = await prisma.ticket.update({
      where: {
        id: command.id,
      },
      data: {
        status: command.status,
        closedAt: command.closedAt,
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };

  async createTicketByUser(entity: Ticket): Promise<Ticket> {
    const dataModel = await prisma.ticket.create({
      data: {
        id: entity.id,
        title: entity.title,
        description: entity.description,
        attachment: entity?.attachment,
        status: entity.status,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        userId: entity.userId,
      }
    });

    return dataModel && Ticket.createFromSnapshot(dataModel);
  };
}