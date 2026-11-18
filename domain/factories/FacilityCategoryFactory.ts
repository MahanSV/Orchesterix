import crypto from "crypto";
import { createFacilityCategoryCommand } from '#application/types/facilitiesCategory/command.ts';
import FacilitiesCategory from '#models/FacilitiesCategory.ts';


export class FacilityCategoryFactory {
  /**
   * Creates a new FacilityCategory entity
   */
  public static create(command: createFacilityCategoryCommand): FacilitiesCategory {
    // Add any domain logic or validation here before creating the entity
    return FacilitiesCategory.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      name: command.name,
      key: command.key,
      order: command.order || 1,
      createdAt: command.createdAt || new Date(),
      updatedAt: command.updatedAt || new Date(),
    });
  };
}