import crypto from "crypto";
import {
  createBankAccountFacilityCommand,
} from '#application/types/bankAccountFacility/command.ts';
import BankAccountFacility from '#models/BankAccountFacility.ts';


export class BankAccountFacilityFactory {
  /**
   * Creates a new BankAccountFacility entity
   */
  public static create(command: createBankAccountFacilityCommand): BankAccountFacility {
    // Add any domain logic or validation here before creating the entity
    return BankAccountFacility.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      name: command.name,
      lastName: command.lastName,
      nationalId: command.nationalId,
      mobile: command.mobile,
      status: command.status,
      password: encrypt(command.password),
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
    });
  };
}
