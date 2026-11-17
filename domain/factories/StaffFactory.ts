import crypto from "crypto";
import Staff from '#models/Staff.ts';
import { encrypt } from '#substructure/utils/encryption.ts';
import { createStaffCommand } from '#application/types/staff/command.ts';
import { StaffRole, StaffStatus } from '#domain/enums/staff.ts';

export class StaffFactory {
  /**
   * Creates a new Staff entity
   */
  public static create(command: createStaffCommand): Staff {
    return Staff.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      name: command.name,
      lastName: command.lastName,
      nationalId: command.nationalId,
      role: command.role || StaffRole.support,
      status: StaffStatus.active,
      password: encrypt(command.password),
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
    });
  };
}