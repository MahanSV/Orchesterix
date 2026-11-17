import crypto from 'crypto';
import User from '#models/User.ts';
import { createUserCommand } from '#application/types/user/command.ts';
import { encrypt } from '#substructure/utils/encryption.ts';
import { userStatus } from '#domain/enums/user.ts';

export class UserFactory {
  /**
   * Creates a new User entity
   */
  public static create(command: createUserCommand): User {
    // Add any domain logic or validation here before creating the entity
    return User.create({
      id: crypto.randomUUID(), // Generate ID if isn't provided
      name: command.name,
      lastName: command.lastName,
      nationalId: command.nationalId,
      mobile: command.mobile,
      status: command.status || userStatus.active,
      password: encrypt(command.password),
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
    });
  }
}