import crypto from 'crypto';
import FacilityField from '#models/FacilityField.ts';
import { createFacilityFieldCommand } from '#application/types/facilityField/command.ts';


export class FacilityFieldFactory {
  /**
   * Creates a new FacilityField entity
   */
  public static create(command: createFacilityFieldCommand): FacilityField {
    // Add any domain logic or validation here before creating the entity
    return FacilityField.create({
      id : command.id || crypto.randomUUID(), // Generate ID if isn't provided
      value: command.value,
      facilityTemplateId: command.facilityTemplateId,
    });
  };
}