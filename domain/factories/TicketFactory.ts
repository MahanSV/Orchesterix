import crypto from 'crypto';
import Ticket, { TicketAnswer } from '#models/Ticket.ts';
import { createTicketCommand } from '#application/types/Ticket/command.ts';
import { TicketStatus } from '#domain/enums/ticket.ts';

export class TicketFactory {
  /**
   * Creates a new Ticket entity
   */
  public static create(command: createTicketCommand): Ticket {
    return Ticket.create({
      id: crypto.randomUUID(), // Generate ID if isn't provided
      title: command.title,
      description: command.description,
      attachment: command.attachment,
      answer: command.answer ? command.answer : undefined,
      status: command.status || TicketStatus.open,
      createdAt: command.createdAt || new Date(),
      updatedAt: command.updatedAt || new Date(),
      closedAt: command.closedAt ? command.closedAt : undefined,
      userId: command.userId,
      staffId: command.staffId ? command.staffId : undefined,
    });
  };

  public static createAnswer(staffId: string, description: string): TicketAnswer {
    if (description.length <= 2)
      throw Error('توضیحات باید حداقل 3 کلمه باشد.');

    return {
      staffId: staffId,
      createdAt: new Date(),
      description: description,
    };
  };
}