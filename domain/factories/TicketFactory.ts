import crypto from "crypto";
import Ticket from '#models/Ticket.ts';
import { createTicketCommand } from '#application/types/Ticket/command.ts';

export class TicketFactory {
  /**
   * Creates a new Ticket entity
   */
  public static create(command: createTicketCommand): Ticket {
    return Ticket.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      description: command.description,
      attachment: command.attachment,
      status: command.status,
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
      closedAt: command.closedAt ? command.closedAt : undefined,
      userId: command.userId,
      staffId: command.staffId ? command.staffId : undefined,
    });
  };
}