import UserInquery from '#models/UserInquery.ts';
import crypto from "crypto";
import { createUserInqueryCommand } from '#application/types/userInquery/command.ts';

export class UserInqueryFactory {
  /**
   * Creates a new UserInquery entity
   */
  public static create(command: createUserInqueryCommand): UserInquery {
    return UserInquery.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      point: command.point ? command.point : undefined,
      guarantees: command.guarantees ? command.guarantees : undefined,
      loans: command.loans ? command.loans : undefined,
      totalTurnover: command.totalTurnover,
      createdAt: command.createdAt || new Date(),
      updatedAt: command.updatedAt || new Date(),
      userId: command.userId,
    });
  };
}