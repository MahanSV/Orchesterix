import crypto from "crypto";
import BankAccount from '#models/BankAccount.ts';
import { createBankAccountCommand } from '#application/types/bankAccount/command.ts';

export class BankAccountFactory {
  /**
   * Creates a new BankAccount entity
   */
  public static create(command: createBankAccountCommand): BankAccount {
    // Add any domain logic or validation here before creating the entity
    return BankAccount.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      accountHolderName: command.accountHolderName,
      shebaId: command.shebaId,
      cardNumber: command.cardNumber,
      branchCode: command.branchCode,
      branchName: command.branchName,
      turnover: command.turnover,
      type: command.type,
      status: command.status,
      score: command.score,
      userId: command.userId,
    });
  };
}