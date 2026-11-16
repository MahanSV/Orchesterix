import crypto from 'crypto';
import { createFacilityTemplateCommand } from '#application/types/facilityTemplate/command.ts';
import FacilityTemplate from '#models/FacilityTemplate.ts';


export class FacilityTemplateFactory {
  /**
   * Creates a new FacilityTemplate entity
   */
  public static create(command: createFacilityTemplateCommand): FacilityTemplate {
    // Add any domain logic or validation here before creating the entity
    return FacilityTemplate.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      value: command.value,
      key: command.key,
      order: command.order,
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
      facilitiesCategoryId: command.facilitiesCategoryId,
    });
  };
}