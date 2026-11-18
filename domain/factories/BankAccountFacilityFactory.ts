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
      value: command.value,
      bankAccountId: command.bankAccountId,
      facilityFieldId: command.facilityFieldId,
      createdAt: command.createdAt || new Date(),
      updatedAt: command.updatedAt || new Date(),
    });
  };
}
